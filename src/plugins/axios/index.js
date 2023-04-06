import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import { normalHandler, errorHandler } from './interceptor'
import utils from '@/utils'

const axiosPlugin = {
  install: (vue) => {
    const service = axios.create({
      baseURL: utils.getDoEnv().VITE_API_BASE_URL,
      paramsSerializer(params) {
        return qs.stringify(params, { arrayFormat: 'comma' })
      }
    })

    service.interceptors.request.use(
      function (config) {
        const token = localStorage.getItem('token')
        if (token) {
          config.headers.set('Authorization', token)
        }
        if (['get', 'delete', 'post'].includes(config.method)) {
          // 过滤请求参数中的空值
          const conf = config
          const _dataKey = ['post', 'put', 'patch'].includes(conf.method) ? 'data' : 'params'
          if (_dataKey in conf) {
            conf[_dataKey] = utils.deepClone(conf[_dataKey], true)
          }
        }
        return config
      },
      function (error) {
        return Promise.reject(error)
      }
    )

    service.interceptors.response.use((response) => normalHandler(response), errorHandler)
    window.axios = service
    vue.prototype.$axios = service
  }
}

export default Vue.use(axiosPlugin)
