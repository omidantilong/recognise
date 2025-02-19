import { chunk, sortBy } from "es-toolkit"
import { outdent } from "outdent"
import type { FinalConfig, Contributor } from "./types"

export function prepare(config: FinalConfig, contributors: Contributor[]): Contributor[][] {
  let prepared = contributors.filter((c) => !c.hide)

  if (config.sort) {
    if (config.sort === "alphabetical") {
      prepared = sortBy(prepared, [(c) => !c.pin, "name"])
    }
  } else {
    prepared = sortBy(prepared, [(c) => !c.pin])
  }

  return chunk(prepared, config.cellsPerRow)
}

export async function generate(config: FinalConfig, contributors: Contributor[]): Promise<string> {
  const chunks = prepare(config, contributors)
  const rows = chunks
    .map((chunk) => {
      const cells = chunk
        .map((contributor) => {
          const contributions = config.templates.contributions({ config, contributor })
          return config.templates.contributor({ config, contributor, contributions })
        })
        .join("")
      return config.templates.row({ config, cells })
    })
    .join("")

  return outdent.string(config.templates.table({ config, rows }))
}
