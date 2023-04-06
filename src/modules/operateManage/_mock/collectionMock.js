import { mockAllCollection, mockCollectionList } from './response'
import { responseSuccess } from '@/mock/utils'

export default [
  window.$mock.mock(/\/collection\/listAll/, 'get', mockAllCollection),
  window.$mock.mock(/\/collection\/list/, 'get', mockCollectionList),
  window.$mock.mock(/\/collection\/add/, 'post', responseSuccess),
  window.$mock.mock(/\/collection\/update/, 'post', responseSuccess),
  window.$mock.mock(/\/collection\/delete/, 'post', responseSuccess),
  window.$mock.mock(/\/collection\/sort/, 'post', responseSuccess),
  window.$mock.mock(/\/collection\/status/, 'post', responseSuccess)
]
