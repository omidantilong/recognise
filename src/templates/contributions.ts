import { FinalConfig, RecoContributor } from "@/types"

const html = String.raw

export default function ({
  config,
  contributor,
}: {
  config: FinalConfig
  contributor: RecoContributor
}) {
  const output = html`
    ${contributor.contributions
      .map((c) => {
        const contribution = config.dictionary[c]
        return html`<span title="${contribution.text}">${contribution.icon}</span>`
      })
      .join("")}
  `
  return output.trim()
}
