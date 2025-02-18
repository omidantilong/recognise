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
      contributor: { ...singleContributor, contributions: ["code", "design", "pizza"] },
    })

    expect(html).toMatchInlineSnapshot(
      `"<span title="code">💻</span><span title="design">🎨</span>"`
    )
  })
})
