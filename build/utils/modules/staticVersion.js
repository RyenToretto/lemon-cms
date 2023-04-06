import { execSync } from 'child_process'
import { PROJECT_PATH } from '../../config'
import { stickToDateTime } from './stickToDateTime'

export const getStaticVersion = () => {
  return execSync('git rev-parse --short HEAD', {
    cwd: PROJECT_PATH,
    encoding: 'utf-8'
  }).trim()
}

export async function generateVersionData() {
  const commitId = getStaticVersion()
  const versionTime = stickToDateTime(Date.now())

  const staticData = {
    ret: 200,
    result: {
      version: commitId,
      versionTime
    }
  }
  return JSON.stringify(staticData)
}
