import { mockAllSubCate, mockSubCateList } from './response'
import { responseSuccess } from '@/mock/utils'

export default [
  window.$mock.mock(/\/subcategory\/listAll/, 'get', mockAllSubCate),
  window.$mock.mock(/\/subcategory\/list/, 'get', mockSubCateList),
  window.$mock.mock(/\/subcategory\/add/, 'post', responseSuccess),
  window.$mock.mock(/\/subcategory\/update/, 'post', responseSuccess),
  window.$mock.mock(/\/subcategory\/delete/, 'post', responseSuccess),
  window.$mock.mock(/\/subcategory\/sort/, 'post', responseSuccess),
  window.$mock.mock(/\/subcategory\/status/, 'post', responseSuccess)
]
