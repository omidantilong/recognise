import { loadConfig as c12 } from "c12"
import { dictionary } from "./dictionary"
import * as templates from "./templates"

import type { FinalConfig, PreConfig } from "./types"
import { RequiredDeep } from "type-fest"

export function defineConfig(config: PreConfig) {
  return config
}

export async function loadConfig() {
  const { config: preConfig }: { config: RequiredDeep<PreConfig> } = await c12({
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
        links: true,
        templates: { ...templates.table },
      },
      image: {
        cells: 12,
        templates: { ...templates.image },
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
    },
    image: {
      ...preConfig.image,
    },
  }

  return config
}
