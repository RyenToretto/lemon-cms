export const LEMON_STATIC_PAPER_R = 'content_paper_static_r' // 内容管理:访问

export const LEMON_OP_MANAGE = 'operate_manage' // ====一级目录：运营管理
export const LEMON_TOP_CATE_R = 'operate_top_cate_r' // 一级分类:访问
export const LEMON_SUB_CATE_R = 'operate_sub_cate_r' // 二级分类:访问
export const LEMON_COLLECTION_R = 'operate_collection_r' // 合集管理:访问

export const LEMON_CLIENT_USER_R = 'client_user_r' // 用户管理:访问

export const LEMON_SYS_ACCOUNT_R = 'system_account_r' // 账号管理:访问

const authMap = {
  LEMON_STATIC_PAPER_R,

  LEMON_OP_MANAGE,
  LEMON_TOP_CATE_R,
  LEMON_SUB_CATE_R,
  LEMON_COLLECTION_R,

  LEMON_CLIENT_USER_R,

  LEMON_SYS_ACCOUNT_R
}
const list = Object.values(authMap).reduce((newArr, each) => [...newArr, each], [])
const authModuleMap = {}
const subModuleMap = {}
const authPanel = [
  {
    name: '图片管理',
    children: [{ key: LEMON_STATIC_PAPER_R, name: '页面访问' }]
  },
  {
    key: LEMON_OP_MANAGE,
    name: '运营管理',
    subModule: [
      {
        name: '一级分类',
        children: [{ key: LEMON_TOP_CATE_R, name: '页面访问' }]
      },
      {
        name: '二级分类',
        children: [{ key: LEMON_SUB_CATE_R, name: '页面访问' }]
      },
      {
        name: '合集管理',
        children: [{ key: LEMON_COLLECTION_R, name: '页面访问' }]
      }
    ]
  },
  {
    name: '用户管理',
    children: [{ key: LEMON_CLIENT_USER_R, name: '页面访问' }]
  },
  {
    name: '账号管理',
    children: [{ key: LEMON_SYS_ACCOUNT_R, name: '页面访问' }]
  }
]
const labelMap = authPanel.reduce((newObj, eachModule) => {
  if (eachModule.key) {
    newObj[eachModule.key] = eachModule.name
  }
  if (eachModule.children && eachModule.children.length) {
    eachModule.children.forEach((eachInfo) => {
      if (eachInfo.key) {
        newObj[eachInfo.key] = `${eachModule.name}${
          eachInfo.name === '页面访问'
            ? eachModule.children.length > 1
              ? '[访问]'
              : ''
            : '[' + eachInfo.name + ']'
        }`
      }
    })
  }
  subModuleMap[eachModule.key] = []
  eachModule.subModule &&
    eachModule.subModule.forEach((eachSub) => {
      eachSub &&
        eachSub.children &&
        eachSub.children.forEach((eachInfo) => {
          if (eachInfo.key) {
            subModuleMap[eachModule.key].push(eachInfo.key)
            authModuleMap[eachInfo.key] = eachModule.key
            newObj[eachInfo.key] = `${eachSub.name}${
              eachInfo.name === '页面访问'
                ? eachSub.children.length > 1
                  ? '[访问]'
                  : ''
                : '[' + eachInfo.name + ']'
            }`
          }
        })
    })
  return newObj
}, {})

const permission = {
  ...authMap,
  list,
  authPanel: authPanel.reduce((newArr, eachInfo) => {
    const newSub = eachInfo.subModule
    if (newSub) {
      delete eachInfo.subModule
      eachInfo.subModule = newSub.reduce((subArr, eachSub) => {
        const newChildren = eachSub.children
        if (newChildren) {
          delete eachSub.children
          eachSub.children = newChildren.reduce((newList, pInfo) => {
            if (!pInfo.serverControl) {
              return [...newList, pInfo]
            }
            return newList
          }, [])
        }
        return [...subArr, eachSub]
      }, [])
    }
    return [...newArr, eachInfo]
  }, []),
  labelMap,
  authModuleMap,
  subModuleMap
}

export default permission
