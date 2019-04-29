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
  return request.post('health-dealer/dealers/getDealerAccountInfo', params).then(res => res.data);
}
export const getDetailedDealerInfo = params => {
  return request.post('health-dealer/dealers/getDetailedDealerInfo', params).then(res => res.data);
}
export const listRecommendByPage = params => {
  return request.post('health-dealer/members/queryRecommendMember', params).then(res => res.data)
}
// 查看会员信息
export const getMemberActivation = params => {
  return request.get('health-dealer/members/getMemberActivation/'+ params).then(res => res.data)
}
//激活会员
export const addActivation = params => {
  return request.put('health-dealer/members/memberActivation', params).then(res => res.data)
  }
  //上传照片
  export const picPath= params => {
  return request.upload('health-file/file/upload', params).then(res => res.data)
  }
