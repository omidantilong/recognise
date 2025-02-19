export interface PreConfig {
  cellsPerRow: number
  files: string[]
  imageSize: number
  projectName: string
  projectOwner: string
  repoType: "gitlab" | "github"
  repoHost: string
  sort: "alphabetical" | false
  templates?: Templates
}

export interface FinalConfig extends Required<PreConfig> {
  cellWidth: number
  dictionary: Dictionary
  templates: Required<Templates>
}

export interface Templates {
  contributor?: Function
  contributions?: Function
  row?: Function
  table?: Function
}

// export interface Templates {
//   contributor?: ({
//     config,
//     contributor,
//     contributions,
//   }: {
//     config: FinalConfig
//     contributor: Contributor
//     contributions: string
//   }) => string
//   contributions?: () => string
//   row?: () => string
//   table?: () => string
// }

export type Dictionary = Record<string, DictionaryEntry>

export interface DictionaryEntry {
  icon: string
  text: string
}

export interface Contributor {
  login?: string
  name: string
  avatar_url: string
  profile?: string
  contributions?: string[]
  hide?: boolean
  pin?: boolean
}
