export const requestAllCollection = ({ name, userId }) => {
  return window.axios.get('/collection/listAll', {
    params: { name, userId }
  })
}

export const requestCollectionList = ({
  name, // 合集名称
  userId,
  source, // 合集类型: 0-平台; 1-用户;

  seq,
  orderBy,
  curPage,
  pageSize
}) => {
  return window.axios.get('/collection/list', {
    params: {
      name, // 合集名称
      userId,
      source, // 合集类型: 0-平台; 1-用户;

      seq,
      orderBy,
      curPage,
      pageSize
    }
  })
}

export const requestAddCollection = ({ name, userId, sort }) => {
  return window.axios.post('/collection/add', { name, userId, sort })
}

export const requestUpdateCollection = ({ id, name, userId, sort }) => {
  return window.axios.post('/collection/update', { id, name, userId, sort })
}

export const requestDeleteCollection = (ids) => {
  return window.axios.post('/collection/delete', { ids })
}

export const requestSetCollectionSort = (id, sort) => {
  return window.axios.post('/collection/sort', { id, sort })
}

export const requestSwitchCollection = (ids, status) => {
  return window.axios.post('/collection/status', { ids, status })
}
