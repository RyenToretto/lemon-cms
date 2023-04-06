import Vue from 'vue'
import Mock from 'mockjs'

Mock.setup({
  timeout: '100-300'
})

const mockPlugin = {
  install: (vue) => {
    // ====ENV
    if (!import.meta.env.PROD && location.pathname === '/mock/') {
      window.$mock = Mock
      vue.prototype.$mock = Mock
    } else {
      window.$mock = { mock: () => {} }
      vue.prototype.$mock = window.$mock
    }
  }
}

export default Vue.use(mockPlugin)
