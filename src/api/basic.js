import request from '@/api/request'

// export function login(params) {
//   return request({
//     url: '/health-authority/login',
//     method: 'post',
//     data: params
//   })
// }
export function login(params) {
  return request.post('health-authority/login', params).then(res => res.data)
}

export function getInfo(token) {
  return request({
    url: '/user/getUser/' + token,
    method: 'get'
  })
}

// export function logout(token) {
//   return request({
//     url: '/user/logout',
//     method: 'get'
//   })
// }

export function logout() {
  return request.get('health-authority/loginOut').then(res => res.data)
}

export function getRoleResource() {
  return request({ url: 'health-authority/role/getRoleResource', method: 'get' })
}
export function sendSms(params) {
  return request.post('health-basic/sms/sendSms', params).then(res => res.data)
}
