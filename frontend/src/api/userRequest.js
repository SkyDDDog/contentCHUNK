import request from './config'

export const Login = (data) => {
  return request({
    url: '/auth-service/auth/login',
    method: 'post',
    data,
  })
}
