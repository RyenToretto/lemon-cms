import { responseUpload } from '@/mock/utils'
import { mockLoginRes, mockStaticVersion, mockAllRegion, mockChineseMap } from '@/mock/response'
import { default as clientMock } from '@/modules/clientManage/_mock'
import { default as contentMock } from '@/modules/contentManage/_mock'
import { default as operateMock } from '@/modules/operateManage/_mock'
import { default as systemMock } from '@/modules/systemManage/_mock'

export default [
  clientMock,
  contentMock,
  operateMock,
  systemMock,
  window.$mock.mock(/\/admin\/login$/, 'post', mockLoginRes),
  window.$mock.mock(/\/admin\/info/, 'get', mockLoginRes),

  window.$mock.mock(/\/item\/area/, 'get', mockChineseMap),
  window.$mock.mock(/\/region\/all(\?)?/, 'get', mockAllRegion),

  window.$mock.mock(/\/upload/, 'post', responseUpload),
  window.$mock.mock(/\/data\/version\.json/, 'get', mockStaticVersion)
]
