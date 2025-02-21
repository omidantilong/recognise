import { FinalConfig, Contributor, TableTemplates, ImageTemplates } from "./types"

const html = String.raw

export const image: Required<ImageTemplates> = {
  contributor: async function ({
    config,
    contributor,
    image,
    x,
    y,
  }: {
    config: FinalConfig
    contributor: Contributor
    image: string
    x: number
    y: number
  }) {
    const ringColor = contributor.pin ? config.image.ringColorPin : config.image.ringColor
    const ringWidth = config.image.ringWidth
    const outerSize = config.image.cellWidth
    const imageSize = outerSize - 4
    const center = outerSize / 2
    const radius = center - 2

    return html`<svg x="${x}" y="${y}" width="${outerSize}" height="${outerSize}">
      <title>${contributor.name}</title>
      <image
        width="${imageSize}"
        height="${imageSize}"
        x="2"
        y="2"
        href="data:image/jpg;base64,${image}"
        clip-path="url(#clip-circle)"
      />
      <circle
        cx="${center}"
        cy="${center}"
        r="${radius}"
        stroke="${ringColor}"
        stroke-width="${ringWidth}"
        fill="none"
      />
    </svg>`
  },

  container: async function ({
    config,
    width,
    height,
    rows,
  }: {
    config: FinalConfig
    width: number
    height: number
    rows: string
  }) {
    const ringPadding = config.image.ringPadding * 2
    const center = config.image.cellWidth / 2
    const radius = center - ringPadding - 2
    return html`<svg
      id="recognise-svg"
      version="1.1"
      viewBox="0 0 ${width} ${height}"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <clipPath id="clip-circle" clipPathUnits="userSpaceOnUse">
          <circle cx="${center}" cy="${center}" r="${radius}" />
        </clipPath>
      </defs>
      ${rows}
    </svg>`
  },
}

export const table: Required<TableTemplates> = {
  contributions: function ({
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
  },

  contributor: function ({
    config,
    contributor,
    contributions,
  }: {
    config: FinalConfig
    contributor: Contributor
    contributions: string
  }) {
    const tags = {
      openLink: "",
      closeLink: "",
    }
    if (config.table.links === true && contributor.profile && contributor.link !== false) {
      tags.openLink = `<a href="${contributor.profile}">`
      tags.closeLink = `</a>`
    }
    return html`
      <td align="center" valign="top" width="${config.table.cellWidth}%">
        ${tags.openLink}
        <div>
          <img width="100" src="${contributor.avatar_url}" />
        </div>
        <div><small>${contributor.name}</small></div>
        ${tags.closeLink}
        <div>${contributions}</div>
      </td>
    `
  },

  row: function ({ cells }: { cells: string }) {
    return html`
      <tr>
        ${cells}
      </tr>
    `
  },

  container: function ({ rows }: { rows: string }) {
    return html`
      <table>
        <tbody>
          ${rows}
        </tbody>
      </table>
    `
  },
}
