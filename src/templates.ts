import { FinalConfig, Contributor } from "./types"

const html = String.raw

export function contributions({
  config,
  contributor,
}: {
  config: FinalConfig
  contributor: Contributor
}) {
  if (!contributor.contributions) return ""

  const output = html`
    ${contributor.contributions
      .map((c) => {
        const contribution = config.dictionary[c]
        return contribution
          ? html`<span title="${contribution.text}">${contribution.icon}</span>`
          : ""
      })
      .join("")}
  `
  return output.trim()
}

export function contributor({
  config,
  contributor,
  contributions,
}: {
  config: FinalConfig
  contributor: Contributor
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

export function row({ cells }: { cells: string }) {
  return html`
    <tr>
      ${cells}
    </tr>
  `
}

export function table({ rows }: { rows: string }) {
  return html`
    <table>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `
}
