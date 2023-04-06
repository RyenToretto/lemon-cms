import { mockAdminList, mockAdminPermissions } from './response'
import { responseSuccess } from '@/mock/utils'

export default [
  window.$mock.mock(/\/admin\/list/, 'get', mockAdminList),
  window.$mock.mock(/\/admin\/permissions/, 'get', mockAdminPermissions),
  window.$mock.mock(/\/admin\/add$/, 'post', responseSuccess),
  window.$mock.mock(/\/admin\/update$/, 'post', responseSuccess),
  window.$mock.mock(/\/admin\/delete$/, 'post', responseSuccess),
  window.$mock.mock(/\/admin\/status$/, 'post', responseSuccess)
]
