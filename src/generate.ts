import { chunk } from "es-toolkit"
import { outdent } from "outdent"
import type { FinalConfig, RecoContributor } from "./types"
import { format } from "prettier"

export async function generate(config: FinalConfig, contributors: RecoContributor[]) {
  const html = {
    contributors: "",
  }

  const chunkedContributors = chunk(contributors, config.cellsPerRow)

  const rows = chunkedContributors
    .map((chunk) => {
      const cells = chunk
        .map((contributor) => config.templates.contributor({ config, contributor }))
        .join("")
      return config.templates.row({ config, cells })
    })
    .join("")

  html.contributors = config.templates.table({ config, rows })

  //return outdent.string(await format(html.contributors, { parser: "html" }))
  return outdent.string(html.contributors)
}
