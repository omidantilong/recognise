import { defaultConfig } from "../../../test/fixtures/defaultConfig"
import { it, describe, expect } from "vitest"

import contributor from "../contributor"
import { contributors } from "test/fixtures/contributors"

describe("contributor template", async () => {
  const config = await defaultConfig()
  const singleContributor = contributors[0]

  it("sets contributor name", async () => {
    const html = contributor({
      config,
      contributor: singleContributor,
      contributions: "",
    })

    expect(html).toContain(`Pizza Guy`)
  })

  it("sets image properties", async () => {
    const html = contributor({
      config,
      contributor: singleContributor,
      contributions: "",
    })

    expect(html).toContain(`<img width="100" src="https://place-hold.it/250x250" />`)
  })

  it("sets cell properties", async () => {
    const html = contributor({
      config,
      contributor: singleContributor,
      contributions: "",
    })

    expect(html).toContain(`<td align="center" valign="top" width="14.29%">`)
  })

  it("injects contributions key", async () => {
    const html = contributor({
      config,
      contributor: singleContributor,
      contributions: "<contributions key>",
    })

    expect(html).toContain(`<div><contributions key></div>`)
  })
})
