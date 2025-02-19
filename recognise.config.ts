import { defineConfig } from "./src/config"

export default defineConfig({
  files: ["README.md"],
  projectName: "recognise",
  projectOwner: "omidantilong",
  repoType: "github",
  repoHost: "https://github.com",
  sort: "alphabetical",
  table: {
    cells: 7,
  },
  image: {
    cells: 12,
  },
})
