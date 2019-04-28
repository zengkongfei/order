import request from '../api/request'

export const getOrderPage = params => {
    return request.post('health-dealer/mapper/order/getOrderPage', params).then(res => res.data)
}
// 修改订单状态
export const updateOrderStatus = params => {
    return request.put('health-dealer/mapper/order/updateOrderStatus', params).then(res => res.data)
}
export const updateOrderListStatus = params => {
    return request.put('health-dealer/mapper/order/updateOrderListStatus', params).then(res => res.data)
}
export const getMemberInfo = params => {
    return request.get('health-mall/member/getMember/' + params).then(res => res.data)
}

// 通过id 获取订单详情
export const getOrderById = params => {
    return request.get('health-dealer/mapper/order/getOrderById/' + params).then(res => res.data)
}
     
// 商品库存(练习)
export const getInventoryPage = params => {
    return request.post('health-mall/inventory/getInventoryPage', params).then(res => res.data)
  }

   // 根据id查商品库存信息(练习)
export const getInventoryById = params => {
    return request.get('health-mall/inventory/getInventoryById/'+ params).then(res => res.data)
  }
  // 商品库存修改(练习)
export const updateInventory = params => {
    return request.post('health-mall/inventory/updateInventory', params).then(res => res.data)
  }

//   //  获取类目管理类目(练习)
// export const categorys = params => {
//     return request.post('health-mall/itemCategory/categorys', params).then(res => res.data)
//   }