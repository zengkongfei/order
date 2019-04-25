import request from '../api/request'

export const getOrderPage = params => {
    return request.post('health-dealer/mapper/order/getOrderPage', params).then(res => res.data)
}
export const updateOrderStatus = params => {
    return request.put('health-dealer/mapper/order/updateOrderStatus', params).then(res => res.data)
}
export const updateOrderListStatus = params => {
    return request.put('health-dealer/mapper/order/updateOrderListStatus', params).then(res => res.data)
}
export const getMemberInfo = params => {
    return request.get('health-mall/member/getMember/' + params).then(res => res.data)
}


