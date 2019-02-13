import  request from '../api/request'

export const vipInfoList = params => {
    return request.post('health-soms/memberDealer/listByPage', params).then(res => res.data)
  }

export const memberList = params => {
  return request.post('health-dealer/members/queryMember', params).then(res => res.data)
}

export const getQrCode = params => {
  return request.post('health-dealer/dealers/getQRCode', params).then(res => res.data);
}
export const getDealerInfo = params => {
  return request.post('health-dealer/dealers/getDealerInfo', params).then(res => res.data);
}
export const getDetailedDealerInfo = params => {
  return request.post('health-dealer/dealers/getDetailedDealerInfo', params).then(res => res.data);
}
