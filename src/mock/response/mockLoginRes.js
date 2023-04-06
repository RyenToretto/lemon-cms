import { generateSuccess } from '@/mock/utils'
import permission from '@/maps/modules/permission'

export default generateSuccess({
  token:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODE0NjMwNjUsInVzZXJuYW1lIjoiYWRtaW4ifQ.xFOPd2otHsDMPyH2FwoT5ilv3N6SyBEmj4UATpZ8i_c',
  role: 'superadmin',
  permission: permission.list,
  username: 'Admin',
  realName: 'Admin'
})
