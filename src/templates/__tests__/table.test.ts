import { it, describe, expect } from "vitest"
import { minify } from "html-minifier-terser"
import row from "../table"

describe("table template", () => {
  it("injects rows", async () => {
    const html = row({ rows: "<tr><td>i love pizza</td></tr>" })

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
