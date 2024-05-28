import request from './config'

export const Login = (data) => {
  return request({
    url: '/auth-service/auth/login',
    method: 'post',
    data,
  })
}

// 新增 Register 函数
export const Register = (data) => {
  return request({
    url: '/auth-service/auth/register',
    method: 'post',
    data,
  })
}
