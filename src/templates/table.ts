const html = String.raw

export default function ({ rows }: { rows: string }) {
  return html`
    <table>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `
}
