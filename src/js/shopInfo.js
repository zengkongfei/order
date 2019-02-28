import request from '../api/request'

export const shopInfoList = params => {
  return request.post('health-dealer/dealers/getDealerInfoList', params).then(res => res.data)
}
