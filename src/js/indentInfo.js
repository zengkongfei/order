import  request from '../api/request'
// 通过id 获取订单详情
export const getOrderById = params => {
    return request.get('health-dealer/mapper/order/getOrderById/' + params).then(res => res.data)
  }


 // 订单审核
 export const updateOrderStatus = params => {
  return request.put('health-dealer/mapper/order/updateOrderStatus', params).then(res => res.data)
}