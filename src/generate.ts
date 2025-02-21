import { chunk, sortBy } from "es-toolkit"
import { outdent } from "outdent"
import type { FinalConfig, Contributor, SortOptions } from "./types"

export function prepare(
  contributors: Contributor[],
  sort: SortOptions,
  cells: number
): Contributor[][] {
  //let sortFields: Array<keyof Contributor | ((c: Contributor) => {})> = []
  let sortFields: Array<keyof Contributor> = []

  if (sort === "name") {
    sortFields.push("name")
    sortFields.push("login")
  }

  const prepared = sortBy(
    contributors.filter((c) => !c.hide),
    [(c) => !c.pin, ...sortFields]
  )

  return chunk(prepared, cells)
}

export async function generate(config: FinalConfig, contributors: Contributor[]): Promise<string> {
  const chunks = prepare(contributors, config.sort, config.table.cells)
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
  const chunks = prepare(contributors, config.sort, config.image.cells)
  const rows = (
    await Promise.all(
      chunks.map(async (chunk, r) => {
        const cells = (
          await Promise.all(
            chunk.map(async (contributor, i) => {
              const x = i * config.image.cellWidth
              const y = r * config.image.cellWidth

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
    config,
    rows,
    width: config.image.cells * config.image.cellWidth,
    height: chunks.length * config.image.cellWidth,
  })
}
