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

export interface Templates {
  contributor?: any
  contributions?: any
  row?: any
  table?: any
}

export type Dictionary = Array<DictionaryEntry>
export type DictionaryKeyed = Record<string, DictionaryEntry>

export interface DictionaryEntry {
  icon: string
  text: string
}

export interface FinalConfig extends Required<PreConfig> {
  cellWidth: number
  dictionary: DictionaryKeyed
}

export interface Contributor {
  login: string
  name: string
  avatar_url: string
  profile: string
  contributions: string[]
}
