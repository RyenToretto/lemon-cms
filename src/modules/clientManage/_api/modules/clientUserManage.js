export const requestAllClientUser = ({ name }) => {
  return window.axios.get('/user/listAll', { params: { name } })
}

export const requestClientUserList = ({
  nickname, // 用户昵称

  seq,
  orderBy,
  curPage,
  pageSize
}) => {
  return window.axios.get('/user/list', {
    params: {
      nickname, // 用户昵称

      seq,
      orderBy,
      curPage,
      pageSize
    }
  })
}

export const requestAddClientUser = ({ nickname, avatar }) => {
  return window.axios.post('/user/add', { nickname, avatar })
}

export const requestUpdateClientUser = ({ id, nickname, avatar }) => {
  return window.axios.post('/user/update', { id, nickname, avatar })
}

export const requestDeleteClientUser = (ids) => {
  return window.axios.post('/user/delete', { ids })
}

export const requestSwitchClientUser = (ids, status) => {
  return window.axios.post('/user/status', { ids, status })
}
