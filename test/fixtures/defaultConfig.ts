import { FinalConfig } from "../../src/types"
import { dictionary } from "../../src/dictionary"
//import { loadTemplate } from "../../src/util"

export async function defaultConfig(): Promise<FinalConfig> {
  return {
    cellsPerRow: 7,
    cellWidth: 14.29,
    dictionary,
    files: ["README.md"],
    imageSize: 100,
    projectName: "recognise",
    projectOwner: "omidantilong",
    repoHost: "https://github.com",
    repoType: "github",
    sort: "alphabetical",
    templates: {
      contributions: () => "contributions",
      contributor: () => `<div>contributor</div>`,
      row: ({ cells }: { cells: string }) => `<tr>${cells}</tr>`,
      table: ({ rows }: { rows: string }) => `<table><tbody>${rows}</tbody></table>`,
      // contributions: await loadTemplate("./templates/contributions"),
      // contributor: await loadTemplate("./templates/contributor"),
      // row: await loadTemplate("./templates/row"),
      // table: await loadTemplate("./templates/table"),
    },
  }
}
