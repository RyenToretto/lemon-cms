// 账号管理
export const addAccountInfo = ({ username, realName, role, permission }) => {
  return axios.post('/admin/add', { username, realName, role, permission })
}
export const updateAccountInfo = ({ id, realName, permission }) => {
  return axios.post('/admin/update', { id, realName, permission })
}
export const getAccountList = ({ curPage, pageSize, username, role, permission, status }) => {
  return axios.get('/admin/list', {
    params: {
      curPage,
      pageSize,
      username,
      role,
      permission,
      status
    }
  })
}
export const delAccountInfo = ({ ids }) => {
  return axios.post('/admin/delete', { ids })
}
export const accountStatus = ({ ids, status }) => {
  return axios.post('/admin/status', { ids, status })
}
// 权限树
export const accountPermissions = () => {
  return axios.get('/admin/permissions')
}
