import { loadConfig as c12 } from "c12"

import { dictionary } from "./dictionary"
import * as templates from "./templates"

import type { FinalConfig, PreConfig } from "./types"

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

  const config: FinalConfig = {
    ...preConfig,
    cellWidth: +(100 / preConfig.cellsPerRow).toFixed(2),
    files: Array.from(new Set(preConfig.files)),
    dictionary,
    templates: {
      contributions: preConfig.templates?.contributions || templates.contributions,
      contributor: preConfig.templates?.contributor || templates.contributor,
      row: preConfig.templates?.row || templates.row,
      table: preConfig.templates?.table || templates.table,
    },
  }
  return config
}
