import { generateSuccess } from '@/mock/utils'

export default generateSuccess([
  {
    id: 91,
    name: '小赵合集', // 合集名称
    status: 'enable',
    userName: '赵武昌', // 用户昵称
    userId: 9528, // 用户ID
    imageCount: 7 // 图片数
  },
  {
    id: 92,
    name: '小钱合集', // 合集名称
    status: 'enable',
    userName: '钱中立', // 用户昵称
    userId: 9529, // 用户ID
    imageCount: 6 // 图片数
  },
  {
    id: 93,
    name: '小孙合集', // 合集名称
    status: 'enable',
    userName: '孙悟空', // 用户昵称
    userId: 9530, // 用户ID
    imageCount: 3 // 图片数
  },
  {
    id: 94,
    name: '小李合集', // 合集名称
    status: 'enable',
    userName: '李大牙', // 用户昵称
    userId: 9531, // 用户ID
    imageCount: 10 // 图片数
  },
  {
    id: 95,
    name: '小周合集', // 合集名称
    status: 'disabled',
    userName: '周大福', // 用户昵称
    userId: 9532, // 用户ID
    imageCount: '@integer(3,50)' // 图片数
  }
])
