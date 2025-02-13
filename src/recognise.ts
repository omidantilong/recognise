import { readFile, writeFile } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { generate } from "./generate"
import { FinalConfig, PreConfig } from "@/types"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const FENCE_START = "<!-- recognise-start -->"
const FENCE_END = "<!-- recognise-end -->"

async function loadFileAsJSON(path: string) {
  return await readFile(resolve(__dirname, path))
    .then((r) => JSON.parse(r.toString()))
    .catch((e) => console.error(e))
}

async function loadFileAsString(path: string) {
  return await readFile(resolve(__dirname, path))
    .then((r) => r.toString())
    .catch((e) => console.error(e))
}

async function loadTemplate(path: string) {
  const template = await import(resolve(__dirname, path)).catch((e) => console.error(e))

  return template.default
}

async function loadConfig() {
  const { default: preConfig }: { default: PreConfig } = await import(
    resolve(__dirname, "../recognise.config.js")
  ).catch((e) => console.error(e))

  // TODO use a config loader to provide defaults

  if (!preConfig.cellsPerRow) {
    preConfig.cellsPerRow = 7
  }

  if (!preConfig.imageSize) {
    preConfig.imageSize = 200
  }

  if (!preConfig.files) {
    preConfig.files = ["README.md"]
  }

  const templates = {
    contributor: await loadTemplate("./templates/contributor"),
    row: await loadTemplate("./templates/row"),
    table: await loadTemplate("./templates/table"),
  }

  //console.log(templates)
  const config: FinalConfig = {
    ...preConfig,
    templates,
    cellWidth: +(100 / preConfig.cellsPerRow).toFixed(2),
  }

  return config
}

async function run() {
  const contributors = await loadFileAsJSON("../.contributors")
  const readme = await loadFileAsString("../README.md")

  if (contributors && readme) {
    const config = await loadConfig()

    const html = await generate(config, contributors)

    const fenceStartPos = readme.indexOf(FENCE_START)
    const fenceEndPos = readme.indexOf(FENCE_END)

    const readmeBeforeFence = readme.slice(0, fenceStartPos + FENCE_START.length)
    const readmeAfterFence = readme.slice(fenceEndPos, -1)

    await writeFile(
      resolve(__dirname, "../README.md"),
      readmeBeforeFence + "\n" + html + "\n" + readmeAfterFence + "\n"
    )
  }
}

run().catch((e) => console.log(e))
