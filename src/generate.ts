import { chunk, sortBy } from "es-toolkit"
import { outdent } from "outdent"
import type { FinalConfig, Contributor } from "./types"

export function prepare(
  config: FinalConfig,
  contributors: Contributor[],
  type: "table" | "image"
): Contributor[][] {
  let prepared = contributors.filter((c) => !c.hide)

  if (config.sort) {
    if (config.sort === "alphabetical") {
      prepared = sortBy(prepared, [(c) => !c.pin, "name"])
    }
  } else {
    prepared = sortBy(prepared, [(c) => !c.pin])
  }

  return chunk(prepared, config[type].cells)
}

export async function generate(config: FinalConfig, contributors: Contributor[]): Promise<string> {
  const chunks = prepare(config, contributors, "table")
  const rows = chunks
    .map((chunk) => {
      const cells = chunk
        .map((contributor) => {
          const contributions = config.table.templates.contributions({ config, contributor })
          return config.table.templates.contributor({ config, contributor, contributions })
        })
        .join("")
      return config.table.templates.row({ config, cells })
    })
    .join("")

  return outdent.string(config.table.templates.container({ config, rows }))
}

export async function generateSVG(
  config: FinalConfig,
  contributors: Contributor[]
): Promise<string> {
  const chunks = prepare(config, contributors, "image")
  const rows = (
    await Promise.all(
      chunks.map(async (chunk, r) => {
        const cells = (
          await Promise.all(
            chunk.map(async (contributor, i) => {
              const x = i * 64
              const y = r * 64

              const image = await fetch(contributor.avatar_url)
                .then((res) => res.arrayBuffer())
                .then((blob) => Buffer.from(blob).toString("base64"))

              return await config.image.templates.contributor({ config, contributor, image, x, y })
            })
          )
        ).join("")
        return cells
      })
    )
  ).join("")

  return await config.image.templates.container({
    rows,
    width: config.image.cells * 64,
    height: chunks.length * 64,
  })
}
