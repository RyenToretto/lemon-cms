import Vue from 'vue'
import * as filter from './common'
import utils from '@/utils'

const filters = {
  ...filter
}

// 将utils/module/filter中的方法设为全局filter
for (const key in filters) {
  const prefix = 'transfer'
  const suffix = key.replace(/(\w){1}/, ($1) => {
    return $1.toUpperCase()
  })
  Vue.filter(key, utils[prefix + suffix])
}
