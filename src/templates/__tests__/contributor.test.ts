import { defaultConfig } from "../../../test/fixtures/defaultConfig"
import { it, describe, expect } from "vitest"

import contributor from "../contributor"
import { contributors } from "test/fixtures/contributors"

describe("contributor template", async () => {
  const config = await defaultConfig()
  const singleContributor = contributors[0]

  it("produces single contributor cell", async () => {
    const html = contributor({
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
