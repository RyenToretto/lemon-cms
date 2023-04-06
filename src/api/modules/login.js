export const requestLogin = (payload) => {
  return window.axios.post('/admin/login', payload)
}
export const requestUserInfo = () => {
  return window.axios.get('/admin/info')
}

// 修改密码
export const changePwd = ({ newPassword, originalPassword }) => {
  return axios.post('/user/password/change', { originalPassword, newPassword })
}
