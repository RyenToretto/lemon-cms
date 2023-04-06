import { generateSuccess } from '@/mock/utils'

export default generateSuccess({
  curPage: 1,
  pageSize: 10,
  totalSize: 5,
  data: [
    {
      id: 91,
      name: '小赵合集', // 合集名称
      userName: '赵武昌', // 用户昵称
      userId: 9528, // 用户ID
      imageCount: '@integer(3,50)', // 图片数
      imageUrls: [
        'https://meiapps.ipolaris-tech.com/mywallpaper/v2/creator_avatar/8ba13c1aa17c43339c9efa447fea9d44.jpeg',
        'https://meiapps.ipolaris-tech.com/mywallpaper/v2/user/506749/9e3c3b2c38d44683bb572de8fe0ff30a.png',
        'https://meiapps-ipolaris-tech-com.obs.cn-north-4.myhuaweicloud.com/mywallpaper/v2/works/d4ad9dd690694ee399bb3d2b2af1c4de.jpg',
        'https://meiapps.ipolaris-tech.com/mywallpaper/v2/creator_avatar/500d4e2ad81c4aaca9497fce624387e3.jpg',
        'https://thirdwx.qlogo.cn/mmopen/vi_32/stNjXibQm8VsrZFtnDDjric7BFpViaUIIfUeQuxzj3H8Y9CLH1P6aURY2tYBxwDSYxB7dSQ9l2fnQbssr49NtPAew/132'
      ],
      source: '@pick(0,1)', // 合集类型: 0-平台; 1-用户;
      status: '@pick(["enable", "disabled"])', // 状态
      sort: 1 // 排序
    },
    {
      id: 92,
      name: '小钱合集', // 合集名称
      userName: '钱中立', // 用户昵称
      userId: 9529, // 用户ID
      imageCount: '@integer(3,50)', // 图片数
      imageUrls: [
        'https://meiapps.ipolaris-tech.com/mywallpaper/v2/creator_avatar/8ba13c1aa17c43339c9efa447fea9d44.jpeg',
        'https://meiapps.ipolaris-tech.com/mywallpaper/v2/user/506749/9e3c3b2c38d44683bb572de8fe0ff30a.png',
        'https://meiapps-ipolaris-tech-com.obs.cn-north-4.myhuaweicloud.com/mywallpaper/v2/works/d4ad9dd690694ee399bb3d2b2af1c4de.jpg',
        'https://meiapps.ipolaris-tech.com/mywallpaper/v2/creator_avatar/500d4e2ad81c4aaca9497fce624387e3.jpg',
        'https://thirdwx.qlogo.cn/mmopen/vi_32/stNjXibQm8VsrZFtnDDjric7BFpViaUIIfUeQuxzj3H8Y9CLH1P6aURY2tYBxwDSYxB7dSQ9l2fnQbssr49NtPAew/132'
      ],
      source: '@pick(0,1)', // 合集类型: 0-平台; 1-用户;
      status: '@pick(["enable", "disabled"])', // 状态
      sort: 1 // 排序
    },
    {
      id: 93,
      name: '小孙合集', // 合集名称
      userName: '孙悟空', // 用户昵称
      userId: 9530, // 用户ID
      imageCount: '@integer(3,50)', // 图片数
      imageUrls: [
        'https://meiapps.ipolaris-tech.com/mywallpaper/v2/creator_avatar/8ba13c1aa17c43339c9efa447fea9d44.jpeg',
        'https://meiapps.ipolaris-tech.com/mywallpaper/v2/user/506749/9e3c3b2c38d44683bb572de8fe0ff30a.png',
        'https://meiapps-ipolaris-tech-com.obs.cn-north-4.myhuaweicloud.com/mywallpaper/v2/works/d4ad9dd690694ee399bb3d2b2af1c4de.jpg',
        'https://meiapps.ipolaris-tech.com/mywallpaper/v2/creator_avatar/500d4e2ad81c4aaca9497fce624387e3.jpg',
        'https://thirdwx.qlogo.cn/mmopen/vi_32/stNjXibQm8VsrZFtnDDjric7BFpViaUIIfUeQuxzj3H8Y9CLH1P6aURY2tYBxwDSYxB7dSQ9l2fnQbssr49NtPAew/132'
      ],
      source: '@pick(0,1)', // 合集类型: 0-平台; 1-用户;
      status: '@pick(["enable", "disabled"])', // 状态
      sort: 1 // 排序
    },
    {
      id: 94,
      name: '小李合集', // 合集名称
      userName: '李大牙', // 用户昵称
      userId: 9531, // 用户ID
      imageCount: '@integer(3,50)', // 图片数
      imageUrls: [
        'https://meiapps.ipolaris-tech.com/mywallpaper/v2/creator_avatar/8ba13c1aa17c43339c9efa447fea9d44.jpeg',
        'https://meiapps.ipolaris-tech.com/mywallpaper/v2/user/506749/9e3c3b2c38d44683bb572de8fe0ff30a.png',
        'https://meiapps-ipolaris-tech-com.obs.cn-north-4.myhuaweicloud.com/mywallpaper/v2/works/d4ad9dd690694ee399bb3d2b2af1c4de.jpg',
        'https://meiapps.ipolaris-tech.com/mywallpaper/v2/creator_avatar/500d4e2ad81c4aaca9497fce624387e3.jpg',
        'https://thirdwx.qlogo.cn/mmopen/vi_32/stNjXibQm8VsrZFtnDDjric7BFpViaUIIfUeQuxzj3H8Y9CLH1P6aURY2tYBxwDSYxB7dSQ9l2fnQbssr49NtPAew/132'
      ],
      source: '@pick(0,1)', // 合集类型: 0-平台; 1-用户;
      status: '@pick(["enable", "disabled"])', // 状态
      sort: 1 // 排序
    },
    {
      id: 95,
      name: '小周合集', // 合集名称
      userName: '周大福', // 用户昵称
      userId: 9532, // 用户ID
      imageCount: '@integer(3,50)', // 图片数
      imageUrls: [
        'https://meiapps.ipolaris-tech.com/mywallpaper/v2/creator_avatar/8ba13c1aa17c43339c9efa447fea9d44.jpeg',
        'https://meiapps.ipolaris-tech.com/mywallpaper/v2/user/506749/9e3c3b2c38d44683bb572de8fe0ff30a.png',
        'https://meiapps-ipolaris-tech-com.obs.cn-north-4.myhuaweicloud.com/mywallpaper/v2/works/d4ad9dd690694ee399bb3d2b2af1c4de.jpg',
        'https://meiapps.ipolaris-tech.com/mywallpaper/v2/creator_avatar/500d4e2ad81c4aaca9497fce624387e3.jpg',
        'https://thirdwx.qlogo.cn/mmopen/vi_32/stNjXibQm8VsrZFtnDDjric7BFpViaUIIfUeQuxzj3H8Y9CLH1P6aURY2tYBxwDSYxB7dSQ9l2fnQbssr49NtPAew/132'
      ],
      source: '@pick(0,1)', // 合集类型: 0-平台; 1-用户;
      status: '@pick(["enable", "disabled"])', // 状态
      sort: 1 // 排序
    }
  ]
})
