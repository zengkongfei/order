import request from '../api/request'

export const shopInfoList = params => {
  return request.post('health-dealer/dealers/getDealerShopList', params).then(res => res.data)
}
// 通过id 获取证照数据
export const getLicencesList = params => {
  return request.post('health-dealer/dealers/getShopLicencesList', params).then(res => res.data)
}
// 获取二维码
export const getQrCode = params => {
  return request.post('health-dealer/dealers/getQRCode', params).then(res => res.data)
}
// 获取地区
export const getArea = params => {
  return request.post('health-basic/area/areas', params).then(res => res.data)
}
// // 获取地区
// export const downPic = params => {
//   return request.post('health-dealer/dealers/downPic', params).then(res => res.data)
// }
