import { FinalConfig, RecoContributor } from "@/types"

const html = String.raw

export default function ({
  config,
  contributor,
}: {
  config: FinalConfig
  contributor: RecoContributor
}) {
  return html`
    <td valign="top" width="${config.cellWidth}%">
      <a href="${contributor.profile}">
        <div>
          <img width="${config.imageSize}" src="${contributor.avatar_url}" />
        </div>
        ${contributor.name}
      </a>
    </td>
  `
}
