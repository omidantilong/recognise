import { it, describe, expect } from "vitest"
import { minify } from "html-minifier-terser"
import row from "../row"

describe("row template", () => {
  it("injects cells", async () => {
    const html = row({ cells: "<td>i love pizza</td>" })

    expect(await minify(html, { collapseWhitespace: true })).toBe("<tr><td>i love pizza</td></tr>")
  })
})
