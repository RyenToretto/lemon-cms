import status from './status'
import auditStatus from './auditStatus'
import utils from '@/utils'

const doEnv = utils.getDoEnv()

const common = {
  devMap: {
    [doEnv.VITE_PORT]: '开发环境',
    8808: '沙盒环境'
  },
  auditStatus,
  status
}

export default common
