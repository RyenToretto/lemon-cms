import { generateSuccess } from '@/mock/utils'

export default generateSuccess({
  version: '@word(8)',
  versionTime: '199@pick([1, 2, 3, 4, 5, 6])-08-08 08:08:08'
})
