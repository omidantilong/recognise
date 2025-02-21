import { defineConfig } from "./src/config"

export default defineConfig({
  files: ["README.md"],
  projectName: "recognise",
  projectOwner: "omidantilong",
  repoType: "github",
  repoHost: "https://github.com",
  sort: "name",
  table: {
    cells: 7,
  },
  image: {
    cells: 12,
    ringColor: "#666666",
    ringPadding: 2,
    ringWidth: 2,
  },
})
