import { readFile, writeFile } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export async function loadFileAsJSON(path: string) {
  return await readFile(resolve(process.cwd(), path))
    .then((r) => JSON.parse(r.toString()))
    .catch((e) => console.error(e))
}

export async function loadFileAsString(path: string) {
  return await readFile(resolve(process.cwd(), path))
    .then((r) => r.toString())
    .catch((e) => console.error(e))
}

export async function loadTemplate(path: string) {
  const template = await import(resolve(__dirname, path)).catch((e) => console.error(e))

  return template.default
}

export async function injectOutput(path: string, output: string) {
  try {
    await writeFile(resolve(process.cwd(), path), output)
  } catch (e) {
    console.error(e)
  }
}
