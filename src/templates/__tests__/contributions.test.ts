import { defaultConfig } from "../../../test/fixtures/defaultConfig"
import { it, describe, expect } from "vitest"

import contributions from "../contributions"
import { contributors } from "test/fixtures/contributors"

describe("contributions template", async () => {
  const config = await defaultConfig()

  const singleContributor = contributors[0]

  it("maps contributions from profile", async () => {
    const html = contributions({
      config,
      contributor: singleContributor,
    })

    expect(html).toContain(`<span title="code">💻</span><span title="design">🎨</span>`)
  })

  it("ignores contribution types that do not exist", async () => {
    const html = contributions({
      config,
      contributor: { ...singleContributor, contributions: ["code", "design", "pizza"] },
    })

    expect(html).toContain(`<span title="code">💻</span><span title="design">🎨</span>`)
  })
})
