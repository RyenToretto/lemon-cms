export const requestAllTopCate = ({ name }) => {
  return window.axios.get('/category/listAll', {
    params: { name }
  })
}

export const requestTopCateList = ({
  name, // 分类名称
  status, // 状态
  visible, // 客户端展示

  seq,
  orderBy,
  curPage,
  pageSize
}) => {
  return window.axios.get('/category/list', {
    params: {
      name, // 分类名称
      status, // 状态
      visible, // 客户端展示

      seq,
      orderBy,
      curPage,
      pageSize
    }
  })
}

export const requestAddTopCate = ({ name, visible, sort }) => {
  return window.axios.post('/category/add', { name, visible, sort })
}

export const requestUpdateTopCate = ({ id, name, visible, sort }) => {
  return window.axios.post('/category/update', { id, name, visible, sort })
}

export const requestDeleteTopCate = (ids) => {
  return window.axios.post('/category/delete', { ids })
}

export const requestSetTopCateSort = (id, sort) => {
  return window.axios.post('/category/sort', { id, sort })
}

export const requestSwitchTopCate = (ids, status) => {
  return window.axios.post('/category/status', { ids, status })
}
