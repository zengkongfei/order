import request from '../api/request'

export const getUserInfo = params => {
  return request.post('health-dealer/dealers/getDealerAccountInfo', params).then(res => res.data)
}
