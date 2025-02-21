import type { RequiredDeep } from "type-fest"

export interface PreConfig {
  files: string[]
  projectName: string
  projectOwner: string
  repoType: "gitlab" | "github"
  repoHost: string
  sort?: SortOptions
  table?: Omit<TableProps, "cellWidth">
  image?: ImageProps
}

export interface FinalConfig extends Required<PreConfig> {
  dictionary: Dictionary
  table: RequiredDeep<TableProps>
  image: RequiredDeep<ImageProps>
}

export interface TableProps {
  cells: number
  cellWidth: number
  templates?: TableTemplates
  links?: boolean
}

export interface ImageProps {
  cells: number
  templates?: ImageTemplates
  ringColor?: string
  ringColorPin?: string
  ringPadding?: number
  ringWidth?: number
}

export interface TableTemplates {
  contributor?: Function
  contributions?: Function
  row?: Function
  container?: Function
}

export interface ImageTemplates {
  contributor?: Function
  container?: Function
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

export interface Contributor {
  login?: string
  name: string
  avatar_url: string
  profile?: string
  contributions?: string[]
  hide?: boolean
  pin?: boolean
  link?: boolean
}

export interface DictionaryEntry {
  icon: string
  text: string
}

export type Dictionary = Record<string, DictionaryEntry>

export type SortOptions = "name" | false
