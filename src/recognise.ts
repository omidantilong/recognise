import { generate, generateSVG } from "./generate"
import { loadFileAsJSON, loadFileAsString, writeOutput } from "./util"
import { loadConfig } from "./config"

const FENCE_START = "<!-- recognise-start -->"
const FENCE_END = "<!-- recognise-end -->"

async function run() {
  const contributors = await loadFileAsJSON(".contributors")

  if (contributors) {
    const config = await loadConfig()

    if (config.table) {
      const html = await generate(config, contributors)
      for (const entry of config.files) {
        const file = await loadFileAsString(entry)

        if (file) {
          const fenceStartPos = file.indexOf(FENCE_START)
          const fenceEndPos = file.indexOf(FENCE_END)

          const readmeBeforeFence = file.slice(0, fenceStartPos + FENCE_START.length)
          const readmeAfterFence = file.slice(fenceEndPos, -1)

          const table = readmeBeforeFence + "\n" + html + "\n" + readmeAfterFence + "\n"

          await writeOutput(entry, table)
        }
      }
    }

    if (config.image) {
      const svg = await generateSVG(config, contributors)
      await writeOutput("contributors.svg", svg)
    }
  }
}

run().catch((e) => console.log(e))
