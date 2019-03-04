import  request from '../api/request'

export const getuserinfo = params => {
    return request.post('health-dealer/dealers/getDealerInfo', params).then(res => res.data)
  }