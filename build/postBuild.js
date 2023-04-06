import { outputDir } from './config'
import { generateStaticVersionFile } from './utils'

generateStaticVersionFile(`${outputDir}/data/version.json`)
  .then(() => {})
  .catch((e) => {
    throw e
  })
  .finally(() => {})
