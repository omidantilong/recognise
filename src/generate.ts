import { chunk } from "es-toolkit"
import { outdent } from "outdent"
import type { FinalConfig, Contributor } from "./types"

export async function generate(config: FinalConfig, contributors: Contributor[]) {
  const html = {
    contributors: "",
  }

  const chunkedContributors = chunk(contributors, config.cellsPerRow)

  const rows = chunkedContributors
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

  html.contributors = config.templates.table({ config, rows })

  return outdent.string(html.contributors)
}
