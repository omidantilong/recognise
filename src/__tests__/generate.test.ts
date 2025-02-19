//import { loadConfig } from "../src/config"
import { it, describe, expect } from "vitest"
import { generate, prepare } from "../generate"
import { contributors } from "./fixtures/contributors"
import { defaultConfig } from "./fixtures/defaultConfig"
import { Contributor, FinalConfig } from "src/types"

describe("list prepare", async () => {
  const config = await defaultConfig()

  it("filters hidden contributors", () => {
    const contributorsWithHidden: Contributor[] = [
      contributors[0],
      contributors[1],
      { ...contributors[2], hide: true },
    ]

    expect(prepare(config, contributorsWithHidden, "table")[0]).toHaveLength(2)
  })

  it("pushes pinned contributors to top", () => {
    const contributorsWithHidden: Contributor[] = [
      contributors[0],
      contributors[1],
      { ...contributors[2], pin: true },
      contributors[3],
      { ...contributors[4], pin: true },
    ]

    const prepared = prepare(config, contributorsWithHidden, "table")

    expect(prepared[0][0]).toHaveProperty("pin", true)
    expect(prepared[0][1]).toHaveProperty("pin", true)
  })

  it("sorts names a-z when sort is alphabetical", () => {
    const configWithSort: FinalConfig = {
      ...config,
      sort: "alphabetical",
    }

    const prepared = prepare(configWithSort, contributors, "table")
    expect(prepared[0][0].name).toBe("Abel Cominoli")
    expect(prepared.at(-1)?.at(-1)?.name).toBe("Whitney Niblo")
  })

  it("sorts names a-z and preserves pins", () => {
    const configWithSort: FinalConfig = {
      ...config,
      sort: "alphabetical",
    }

    const contributorsWithHidden: Contributor[] = [
      contributors[0],
      contributors[1],
      { ...contributors[2], pin: true },
      contributors[3],
      { ...contributors[4], pin: true },
      { ...contributors[5], pin: true },
    ]

    const prepared = prepare(configWithSort, contributorsWithHidden, "table")

    expect(prepared[0][0].pin).toBe(true)
    expect(prepared[0][1].pin).toBe(true)
    expect(prepared[0][2].pin).toBe(true)

    expect(prepared[0][0].name).toBe("Brittany Luckey")
    expect(prepared[0][1].name).toBe("Cooper Restorick")
    expect(prepared[0][2].name).toBe("Sada Clouter")
    expect(prepared[0][3].name).toBe("Elli Roony")
    expect(prepared[0][4].name).toBe("Franky Hare")
    expect(prepared[0][5].name).toBe("Pizza Guy")
  })

  it("does not sort when no sort option provided", () => {
    const prepared = prepare(config, contributors, "table")
    expect(prepared[0][0].name).toBe("Pizza Guy")
    expect(prepared.at(-1)?.at(-1)?.name).toBe("Pauletta Kivits")
  })

  it("chunks list into configured cellsPerRow value", () => {
    const prepared = prepare(config, contributors, "table")
    expect(prepared).toHaveLength(5)
    expect(prepared[0]).toHaveLength(7)
    expect(prepared[4]).toHaveLength(3)
  })
})

//describe("html generator", async () => {})
