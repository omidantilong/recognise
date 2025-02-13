import { FinalConfig, RecoContributor } from "@/types"
const html = String.raw

export default function ({
  config,
  contributor,
  contributions,
}: {
  config: FinalConfig
  contributor: RecoContributor
  contributions: string
}) {
  return html`
    <td align="center" valign="top" width="${config.cellWidth}%">
      <a href="${contributor.profile}">
        <div>
          <img width="${config.imageSize}" src="${contributor.avatar_url}" />
        </div>
        <div><small>${contributor.name}</small></div>
      </a>
      <div>${contributions}</div>
    </td>
  `
}
