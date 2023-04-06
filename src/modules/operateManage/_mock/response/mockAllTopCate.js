import { generateSuccess } from '@/mock/utils'

export default generateSuccess([
  {
    id: 1,
    name: '古朴', // 分类名称
    visible: true, // 客户端展示
    status: 'enable' // 状态
  },
  {
    id: 2,
    name: '外国风情', // 分类名称
    visible: true, // 客户端展示
    status: 'enable' // 状态
  },
  {
    id: 3,
    name: '纯色', // 分类名称
    visible: true, // 客户端展示
    status: 'enable' // 状态
  },
  {
    id: 4,
    name: '银河系', // 分类名称
    visible: true, // 客户端展示
    status: 'disabled' // 状态
  },
  {
    id: 5,
    name: '玛雅风', // 分类名称
    visible: false, // 客户端展示
    status: 'disabled' // 状态
  },
  {
    id: 6,
    name: '惊悚', // 分类名称
    visible: false, // 客户端展示
    status: 'enable' // 状态
  }
])
