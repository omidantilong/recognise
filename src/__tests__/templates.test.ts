import { it, describe, expect } from "vitest"
import * as templates from "../templates"
import { defaultConfig } from "./fixtures/defaultConfig"
import { contributors } from "./fixtures/contributors"

describe("table > contributions", async () => {
  const config = await defaultConfig()
  const singleContributor = contributors[0]

  it("maps contributions from profile", async () => {
    const html = templates.table.contributions({
      config,
      contributor: { ...singleContributor, contributions: ["code", "design", "invalid-type"] },
    })

    expect(html).toMatchInlineSnapshot(
      `"<span title="code">💻</span><span title="design">🎨</span>"`
    )
  })

  it("returns an empty string if no contributions", async () => {
    const html = templates.table.contributions({
      config,
      contributor: { ...singleContributor, contributions: undefined },
    })

    expect(html).toBe("")
  })
})

describe("table > contributor", async () => {
  const config = await defaultConfig()
  const singleContributor = contributors[0]

  it("outputs contributor", async () => {
    const html = templates.table.contributor({
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

  it("outputs contributor without link when set to false", async () => {
    const html = templates.table.contributor({
      config,
      contributor: { ...singleContributor, link: false },
      contributions: "<contributions key>",
    })

    expect(html).toMatchInlineSnapshot(`
      "
            <td align="center" valign="top" width="14.29%">
              
              <div>
                <img width="100" src="https://place-hold.it/250x250" />
              </div>
              <div><small>Pizza Guy</small></div>
              
              <div><contributions key></div>
            </td>
          "
    `)
  })

  it("outputs contributor without link when profile is missing", async () => {
    const html = templates.table.contributor({
      config,
      contributor: { ...singleContributor, profile: undefined },
      contributions: "<contributions key>",
    })

    expect(html).toMatchInlineSnapshot(`
      "
            <td align="center" valign="top" width="14.29%">
              
              <div>
                <img width="100" src="https://place-hold.it/250x250" />
              </div>
              <div><small>Pizza Guy</small></div>
              
              <div><contributions key></div>
            </td>
          "
    `)
  })

  it("outputs contributor without link when disabled in config", async () => {
    const html = templates.table.contributor({
      config: { ...config, table: { ...config.table, links: false } },
      contributor: singleContributor,
      contributions: "<contributions key>",
    })

    expect(html).toMatchInlineSnapshot(`
      "
            <td align="center" valign="top" width="14.29%">
              
              <div>
                <img width="100" src="https://place-hold.it/250x250" />
              </div>
              <div><small>Pizza Guy</small></div>
              
              <div><contributions key></div>
            </td>
          "
    `)
  })
})

describe("table > row", () => {
  it("injects cells", async () => {
    const html = templates.table.row({ cells: "<td>i love pizza</td>" })

    expect(html).toMatchInlineSnapshot(`
      "
            <tr>
              <td>i love pizza</td>
            </tr>
          "
    `)
  })
})

describe("table > container", () => {
  it("injects rows", async () => {
    const html = templates.table.container({ rows: "<tr><td>i love pizza</td></tr>" })

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

describe("image > contributor", async () => {
  const config = await defaultConfig()
  const singleContributor = contributors[0]

  it("outputs single contributor image", async () => {
    const html = await templates.image.contributor({
      config,
      contributor: singleContributor,
      contributions: "<contributions key>",
      image: "fake-base64-image",
      x: 0,
      y: 0,
    })

    expect(html).toMatchInlineSnapshot(`
      "<svg x="0" y="0" width="96" height="96">
            <title>Pizza Guy</title>
            <image
              width="92"
              height="92"
              x="2"
              y="2"
              href="data:image/jpg;base64,fake-base64-image"
              clip-path="url(#clip-circle)"
            />
            <circle
              cx="48"
              cy="48"
              r="46"
              stroke="#666666"
              stroke-width="1"
              fill="none"
            />
          </svg>"
    `)
  })

  it("sets custom ring color", async () => {
    const html = await templates.image.contributor({
      config: { ...config, image: { ...config.image, ringColor: "#FF0000" } },
      contributor: singleContributor,
      contributions: "<contributions key>",
      image: "fake-base64-image",
      x: 0,
      y: 0,
    })

    expect(html).toMatchInlineSnapshot(`
      "<svg x="0" y="0" width="96" height="96">
            <title>Pizza Guy</title>
            <image
              width="92"
              height="92"
              x="2"
              y="2"
              href="data:image/jpg;base64,fake-base64-image"
              clip-path="url(#clip-circle)"
            />
            <circle
              cx="48"
              cy="48"
              r="46"
              stroke="#FF0000"
              stroke-width="1"
              fill="none"
            />
          </svg>"
    `)
  })

  it("sets custom ring pin color", async () => {
    const html = await templates.image.contributor({
      config: { ...config, image: { ...config.image, ringColorPin: "#FF0000" } },
      contributor: { ...singleContributor, pin: true },
      contributions: "<contributions key>",
      image: "fake-base64-image",
      x: 0,
      y: 0,
    })

    expect(html).toMatchInlineSnapshot(`
      "<svg x="0" y="0" width="96" height="96">
            <title>Pizza Guy</title>
            <image
              width="92"
              height="92"
              x="2"
              y="2"
              href="data:image/jpg;base64,fake-base64-image"
              clip-path="url(#clip-circle)"
            />
            <circle
              cx="48"
              cy="48"
              r="46"
              stroke="#FF0000"
              stroke-width="1"
              fill="none"
            />
          </svg>"
    `)
  })
})

describe("image > container", async () => {
  it("injects svg content", async () => {
    const html = await templates.image.container({
      rows: "<g><circle /><image /></g>",
      width: 300,
      height: 100,
    })

    expect(html).toMatchInlineSnapshot(`
      "<svg
            id="recognise-svg"
            version="1.1"
            viewBox="0 0 300 100"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <defs>
              <clipPath id="clip-circle" clipPathUnits="userSpaceOnUse">
                <circle cx="48" cy="48" r="46" />
              </clipPath>
            </defs>
            <g><circle /><image /></g>
          </svg>"
    `)
  })
})
