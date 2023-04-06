export const requestAllSubCate = ({ name, categoryId }) => {
  return window.axios.get('/subcategory/listAll', {
    params: { name, categoryId }
  })
}

export const requestSubCateList = ({
  name, // 分类名称
  categoryId, // 一级分类
  status, // 状态
  visible, // 客户端展示

  seq,
  orderBy,
  curPage,
  pageSize
}) => {
  return window.axios.get('/subcategory/list', {
    params: {
      name, // 分类名称
      categoryId, // 一级分类
      status, // 状态
      visible, // 客户端展示

      seq,
      orderBy,
      curPage,
      pageSize
    }
  })
}

export const requestAddSubCate = ({ name, preUrl, categoryId, visible, sort }) => {
  return window.axios.post('/subcategory/add', { name, preUrl, categoryId, visible, sort })
}

export const requestUpdateSubCate = ({ id, name, preUrl, categoryId, visible, sort }) => {
  return window.axios.post('/subcategory/update', { id, name, preUrl, categoryId, visible, sort })
}

export const requestDeleteSubCate = (ids) => {
  return window.axios.post('/subcategory/delete', { ids })
}

export const requestSetSubCateSort = (id, sort) => {
  return window.axios.post('/subcategory/sort', { id, sort })
}

export const requestSwitchSubCate = (ids, status) => {
  return window.axios.post('/subcategory/status', { ids, status })
}
