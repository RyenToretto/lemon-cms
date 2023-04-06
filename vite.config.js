import dayjs from 'dayjs'
import { defineConfig, loadEnv } from 'vite'
import { getLocalIp, parseEnv } from './build/utils'
import pkg from './package.json'
import alias from './build/vite/alias'
import { createVitePlugins } from './build/vite/plugin'

const { dependencies, devDependencies, name, version } = pkg
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
}

export default defineConfig(({ mode, command }) => {
  const isBuild = command === 'build'
  const root = process.cwd()
  const env = parseEnv(loadEnv(mode, root))

  return {
    base: env.VITE_PUBLIC_PATH,
    resolve: {
      alias
    },
    esbuild: {
      pure: env.VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : []
    },
    plugins: createVitePlugins(env, isBuild),
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    },
    build: {
      /**
       * 最终构建的浏览器兼容目标
       * https://www.vitejs.net/config/#build-target
       */
      target: 'es2015',
      cssTarget: 'chrome80',
      outDir: env.VITE_OUTPUT_DIR,
      reportCompressedSize: false,
      chunkSizeWarningLimit: 2000,
      brotliSize: false // 关闭 brotliSize 显示可以稍微减少打包时间
      // minify: 'terser',
      /**
       * 当 minify=“minify:'terser'” 解开注释
       *
       * 最终构建的浏览器兼容目标
       * https://www.vitejs.net/config/#build-target
       */
      /**
        terserOptions: {
          compress: {
            keep_infinity: true,
            drop_console:  env.VITE_DROP_CONSOLE,
          },
        },
       */
    },
    server: {
      host: '127.0.0.1',
      port: env.VITE_PORT,
      strictPort: false,
      open: `http://${getLocalIp()}:${env.VITE_PORT}/mock/`,
      proxy: {
        '/lemon': {
          target: env.VITE_API_PROXY,
          changeOrigin: true,
          ws: true
        }
      }
    },
    preview: {
      host: '127.0.0.1',
      port: env.VITE_PORT,
      strictPort: false,
      open: `http://127.0.0.1:${env.VITE_PORT}/`
    }
  }
})
