import { FinalConfig } from "../../types"
import { dictionary } from "../../dictionary"
//import { loadTemplate } from "../../src/util"

export async function defaultConfig(): Promise<FinalConfig> {
  return {
    dictionary,
    files: ["README.md"],
    projectName: "recognise",
    projectOwner: "omidantilong",
    repoHost: "https://github.com",
    repoType: "github",
    sort: false,
    table: {
      cellWidth: 14.29,
      cells: 7,
      links: true,
      templates: {
        contributions: () => "contributions",
        contributor: () => `<div>contributor</div>`,
        row: ({ cells }: { cells: string }) => `<tr>${cells}</tr>`,
        container: ({ rows }: { rows: string }) => `<table><tbody>${rows}</tbody></table>`,
        // contributions: await loadTemplate("./templates/contributions"),
        // contributor: await loadTemplate("./templates/contributor"),
        // row: await loadTemplate("./templates/row"),
        // table: await loadTemplate("./templates/table"),
      },
    },
    image: {
      cells: 12,
      cellWidth: 96,
      ringColor: "#666666",
      ringColorPin: "#00FF00",
      ringPadding: 0,
      ringWidth: 1,
      templates: {
        contributor: () => "contributor",
        container: ({ rows }: { rows: string }) => `<svg>${rows}</svg>`,
      },
    },
  }
}
