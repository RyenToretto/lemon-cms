import { createVuePlugin } from 'vite-plugin-vue2'
import legacy from '@vitejs/plugin-legacy' // 为打包后的文件提供传统浏览器兼容性支持
import Icons from 'unplugin-icons/vite'
import { configHtmlPlugin } from './html'

export function createVitePlugins(env, isBuild) {
  const vitePlugins = [createVuePlugin()]

  vitePlugins.push(
    legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    })
  )

  vitePlugins.push(Icons())
  vitePlugins.push(configHtmlPlugin(env, isBuild))

  return vitePlugins
}
