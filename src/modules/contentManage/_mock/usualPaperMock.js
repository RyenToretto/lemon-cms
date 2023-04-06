import { mockUsualPaperList } from './response'
import { responseSuccess } from '@/mock/utils'

export default [
  window.$mock.mock(/\/content\/list/, 'get', mockUsualPaperList),
  window.$mock.mock(/\/content\/add/, 'post', responseSuccess),
  window.$mock.mock(/\/content\/update/, 'post', responseSuccess),
  window.$mock.mock(/\/content\/delete/, 'post', responseSuccess),
  window.$mock.mock(/\/content\/status/, 'post', responseSuccess),
  window.$mock.mock(/\/content\/downloadType/, 'post', responseSuccess),
  window.$mock.mock(/\/content\/recommend/, 'post', responseSuccess),
  window.$mock.mock(/\/content\/user/, 'post', responseSuccess),
  window.$mock.mock(/\/content\/collection/, 'post', responseSuccess),
  window.$mock.mock(/\/content\/category/, 'post', responseSuccess)
]
