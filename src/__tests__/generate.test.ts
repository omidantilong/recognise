//import { loadConfig } from "../src/config"
import { it, describe, expect } from "vitest"
import { generate } from "../generate"
import { contributors } from "./fixtures/contributors"
import { defaultConfig } from "./fixtures/defaultConfig"

describe("html generator", async () => {
  it("sets the correct cell width", async () => {
    // const config = await defaultConfig()
    // const output = await generate(config, contributors)
    // console.log(output)
  })
})
