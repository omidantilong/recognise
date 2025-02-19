import { loadConfig as c12 } from "c12"
import { dictionary } from "./dictionary"
import * as templates from "./templates"

import type { FinalConfig, PreConfig } from "./types"

export function defineConfig(config: PreConfig) {
  return config
}

export async function loadConfig() {
  const { config: preConfig }: { config: Required<PreConfig> } = await c12({
    name: "recognise",
    defaults: {
      files: ["README.md"],
      projectName: "",
      projectOwner: "",
      repoHost: "https://github.com",
      repoType: "github",
      sort: false,
      table: {
        cells: 7,
        templates: {},
      },
      image: {
        cells: 12,
        templates: {},
      },
    },
  })

  const config: FinalConfig = {
    ...preConfig,
    files: Array.from(new Set(preConfig.files)),
    dictionary,
    table: {
      ...preConfig.table,
      cellWidth: +(100 / preConfig.table.cells).toFixed(2),
      templates: {
        contributions: preConfig.table?.templates?.contributions || templates.table.contributions,
        contributor: preConfig.table?.templates?.contributor || templates.table.contributor,
        row: preConfig.table?.templates?.row || templates.table.row,
        container: preConfig.table?.templates?.container || templates.table.container,
      },
    },
    image: {
      ...preConfig.image,
      templates: {
        contributor: preConfig.image?.templates?.contributor || templates.image.contributor,
        container: preConfig.image?.templates?.container || templates.image.container,
      },
    },
  }

  return config
}
