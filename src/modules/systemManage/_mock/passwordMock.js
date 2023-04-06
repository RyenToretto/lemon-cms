import { responseSuccess } from '@/mock/utils'

export default [window.$mock.mock(/\/user\/password\/change/, 'post', responseSuccess)]
