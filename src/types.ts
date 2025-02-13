export interface PreConfig {
  projectName: string
  projectOwner: string
  repoType: "gitlab" | "github"
  repoHost: string
  files: string[]
  imageSize: number
  cellsPerRow: number
  templates?: {
    contributor?: any
    row?: any
    table?: any
  }
}

export interface FinalConfig extends Required<PreConfig> {
  cellWidth: number
}

export interface RecoContributor {
  login: string
  name: string
  avatar_url: string
  profile: string
  contributions: string[]
}
