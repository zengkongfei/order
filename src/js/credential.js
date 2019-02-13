import  request from '../api/request'

export const rolesList = params => {
    return request.post('health-soms/clerk/getClerkPage', params).then(res => res.data)
  }
  
  export const rolesStatus = params => {
    return request.put('health-soms/clerk/clerkAccountEd', params).then(res => res.data)
  }

  export const getrolesName = params => {
    return request.post('health-soms/roleResourceResource/query', params).then(res => res.data)
  }

  export const getrolesMeua = params => {
    return request.post('health-soms//clerk/getClerkRole', params).then(res => res.data)
  }

  export const dotList = params => {
    return request.post('health-soms/dealerStatus/listByPage', params).then(res => res.data)
  }

  export const dotStatus = params => {
    return request.put('health-soms/dealerStatus/update', params).then(res => res.data)
  }

  export const vipList = params => {
    return request.post('health-soms/member/getMemberPage', params).then(res => res.data)
  }

  export const vipStatus = params => {
    return request.put('health-soms/member/memberAccountEd', params).then(res => res.data)
  }

  

