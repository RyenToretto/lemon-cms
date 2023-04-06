import { generateSuccess } from '@/mock/utils'

export default generateSuccess({
  curPage: 1,
  pageSize: 10,
  totalSize: 5,
  data: [
    {
      id: 9528,
      nickname: '赵武昌', // 用户昵称
      avatar:
        'https://meiapps.ipolaris-tech.com/mywallpaper/v2/creator_avatar/079f1014cbfc46109450a18abbb36f6b.jpeg',
      worksCount: '@integer(3,50)', // 作品数
      collectionCount: '@integer(3,80)' // 合集数
    },
    {
      id: 9529,
      nickname: '钱中立', // 用户昵称
      avatar:
        'https://meiapps.ipolaris-tech.com/mywallpaper/v2/user/506749/9e3c3b2c38d44683bb572de8fe0ff30a.png',
      worksCount: '@integer(3,50)', // 作品数
      collectionCount: '@integer(3,80)' // 合集数
    },
    {
      id: 9530,
      nickname: '孙悟空', // 用户昵称
      avatar:
        'https://meiapps.ipolaris-tech.com/mywallpaper/v2/creator_avatar/500d4e2ad81c4aaca9497fce624387e3.jpg',
      worksCount: '@integer(3,50)', // 作品数
      collectionCount: '@integer(3,80)' // 合集数
    },
    {
      id: 9531,
      nickname: '李大牙', // 用户昵称
      avatar:
        'https://meiapps.ipolaris-tech.com/mywallpaper/v2/creator_avatar/33c0e9c2175540b1994cd644787851bf.png',
      worksCount: '@integer(3,50)', // 作品数
      collectionCount: '@integer(3,80)' // 合集数
    },
    {
      id: 9532,
      nickname: '周大福', // 用户昵称
      avatar:
        'https://meiapps.ipolaris-tech.com/mywallpaper/v2/creator_avatar/b00c2501fde44cfcbc713a80693fb52b.png',
      worksCount: '@integer(3,50)', // 作品数
      collectionCount: '@integer(3,80)' // 合集数
    }
  ]
})
