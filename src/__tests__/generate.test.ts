//import { loadConfig } from "../src/config"
import { it, describe, expect } from "vitest"
import { generate, prepare } from "../generate"
import { contributors } from "./fixtures/contributors"
import { defaultConfig } from "./fixtures/defaultConfig"
import { Contributor, FinalConfig } from "src/types"

describe("list prepare", async () => {
  const config = await defaultConfig()

  it("filters hidden contributors", () => {
    const inputWithHidden: Contributor[] = [
      contributors[0],
      contributors[1],
      {
        ...contributors[2],
        hide: true,
      },
    ]

    expect(prepare(config, inputWithHidden)[0]).toHaveLength(2)
  })

  it("sorts names a-z when sort is alphabetical", () => {
    const configWithSort: FinalConfig = {
      ...config,
      sort: "alphabetical",
    }

    const prepared = prepare(configWithSort, contributors)
    expect(prepared[0][0].name).toBe("Abel Cominoli")
    expect(prepared.at(-1)?.at(-1)?.name).toBe("Whitney Niblo")
  })

  it("does not sort when no sort option provided", () => {
    const prepared = prepare(config, contributors)
    expect(prepared[0][0].name).toBe("Pizza Guy")
    expect(prepared.at(-1)?.at(-1)?.name).toBe("Pauletta Kivits")
  })

  it("chunks list into configured cellsPerRow value", () => {
    const prepared = prepare(config, contributors)
    expect(prepared).toHaveLength(5)
    expect(prepared[0]).toHaveLength(7)
    expect(prepared[4]).toHaveLength(3)
  })
})

describe("html generator", async () => {
  it("sets the correct cell width", async () => {
    // const config = await defaultConfig()
    // const output = await generate(config, contributors)
    // console.log(output)
  })
})
