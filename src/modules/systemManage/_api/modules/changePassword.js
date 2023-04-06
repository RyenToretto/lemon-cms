// 修改密码
export const changePwd = ({ newPassword, originalPassword }) => {
  return axios.post('/user/password/change', { originalPassword, newPassword })
}
