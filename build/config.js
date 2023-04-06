import path from 'path'
import { loadEnv } from 'vite'
import { parseEnv } from './utils'
export const env = parseEnv(loadEnv('production', process.cwd()))

export const PROJECT_PATH = path.resolve(__dirname, '../')

const outputEnv = env.VITE_OUTPUT_DIR
export const outputDir =
  outputEnv && outputEnv.startsWith('/') ? outputEnv : path.resolve(__dirname, `../${outputEnv}`)
