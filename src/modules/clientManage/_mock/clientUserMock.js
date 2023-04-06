import { mockAllClientUser, mockClientUserList } from './response'
import { responseSuccess } from '@/mock/utils'

export default [
  window.$mock.mock(/\/user\/listAll/, 'get', mockAllClientUser),
  window.$mock.mock(/\/user\/list/, 'get', mockClientUserList),
  window.$mock.mock(/\/user\/add/, 'post', responseSuccess),
  window.$mock.mock(/\/user\/update/, 'post', responseSuccess),
  window.$mock.mock(/\/user\/delete/, 'post', responseSuccess),
  window.$mock.mock(/\/user\/status/, 'post', responseSuccess)
]
