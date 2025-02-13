export interface PreConfig {
  projectName: string
  projectOwner: string
  repoType: "gitlab" | "github"
  repoHost: string
  files: string[]
  imageSize: number
  cellsPerRow: number
  templates?: Templates
}

export interface FinalConfig extends Required<PreConfig> {
  cellWidth: number
  dictionary: DictionaryKeyed
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

export type Dictionary = Array<DictionaryEntry>
export type DictionaryKeyed = Record<string, DictionaryEntry>

export interface DictionaryEntry {
  icon: string
  text: string
}

export interface Contributor {
  login: string
  name: string
  avatar_url: string
  profile: string
  contributions: string[]
}
