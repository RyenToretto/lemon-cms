import { mockAllTopCate, mockTopCateList } from './response'
import { responseSuccess } from '@/mock/utils'

export default [
  window.$mock.mock(/\/category\/listAll/, 'get', mockAllTopCate),
  window.$mock.mock(/\/category\/list/, 'get', mockTopCateList),
  window.$mock.mock(/\/category\/add/, 'post', responseSuccess),
  window.$mock.mock(/\/category\/update/, 'post', responseSuccess),
  window.$mock.mock(/\/category\/delete/, 'post', responseSuccess),
  window.$mock.mock(/\/category\/sort/, 'post', responseSuccess),
  window.$mock.mock(/\/category\/status/, 'post', responseSuccess)
]
