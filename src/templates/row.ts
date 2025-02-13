const html = String.raw
export default function ({ cells }: { cells: string }) {
  return html`
    <tr>
      ${cells}
    </tr>
  `
}
