import { it, describe, expect } from "vitest"
import * as templates from "../templates"
import { defaultConfig } from "./fixtures/defaultConfig"
import { contributors } from "./fixtures/contributors"

describe("contributions", async () => {
  const config = await defaultConfig()
  const singleContributor = contributors[0]

  it("maps contributions from profile", async () => {
    const html = templates.contributions({
      config,
      contributor: { ...singleContributor, contributions: ["code", "design", "invalid-type"] },
    })

    expect(html).toMatchInlineSnapshot(
      `"<span title="code">💻</span><span title="design">🎨</span>"`
    )
  })
})

describe("contributor", async () => {
  const config = await defaultConfig()
  const singleContributor = contributors[0]

  it("outputs single contributor cell", async () => {
    const html = templates.contributor({
      config,
      contributor: singleContributor,
      contributions: "<contributions key>",
    })

    expect(html).toMatchInlineSnapshot(`
      "
          <td align="center" valign="top" width="14.29%">
            <a href="https://example.com">
              <div>
                <img width="100" src="https://place-hold.it/250x250" />
              </div>
              <div><small>Pizza Guy</small></div>
            </a>
            <div><contributions key></div>
          </td>
        "
    `)
  })
})

describe("row", () => {
  it("injects cells", async () => {
    const html = templates.row({ cells: "<td>i love pizza</td>" })

    expect(html).toMatchInlineSnapshot(`
      "
          <tr>
            <td>i love pizza</td>
          </tr>
        "
    `)
  })
})

describe("table", () => {
  it("injects rows", async () => {
    const html = templates.table({ rows: "<tr><td>i love pizza</td></tr>" })

    expect(html).toMatchInlineSnapshot(`
      "
          <table>
            <tbody>
              <tr><td>i love pizza</td></tr>
            </tbody>
          </table>
        "
    `)
  })
})
