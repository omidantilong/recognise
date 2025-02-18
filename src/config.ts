import { keyBy } from "es-toolkit"
import { loadConfig as c12 } from "c12"

import { dictionary } from "./dictionary"
import { loadTemplate } from "./util"

import type { FinalConfig, PreConfig, Templates } from "./types"

export function defineConfig(config: PreConfig) {
  return config
}

export async function loadConfig() {
  const { config: preConfig }: { config: PreConfig } = await c12({
    name: "recognise",
    defaults: {
      cellsPerRow: 7,
      files: ["README.md"],
      imageSize: 100,
      projectName: "",
      projectOwner: "",
      repoHost: "https://github.com",
      repoType: "github",
      sort: false,
    },
  })

  const templates: Required<Templates> = {
    contributions: await loadTemplate("./templates/contributions"),
    contributor: await loadTemplate("./templates/contributor"),
    row: await loadTemplate("./templates/row"),
    table: await loadTemplate("./templates/table"),
  }

  const config: FinalConfig = {
    ...preConfig,
    cellWidth: +(100 / preConfig.cellsPerRow).toFixed(2),
    files: Array.from(new Set(preConfig.files)),
    dictionary: keyBy(dictionary, (d) => d.text),
    templates,
  }

  return config
}
