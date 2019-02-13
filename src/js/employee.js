import  request from '../api/request'
export const getGateList = params => {
  return request.post('health-soms/employee/getEmployeePage', params).then(res => res.data)
}
export const resourceZree = params => {
  return request.post('health-soms/resource/query', params).then(res => res.data)
}
export const resourceAdd = params => {
  return request.post('health-soms/resource', params).then(res => res.data)
}

export const roleAdd = params => {
  return request.post('health-soms/role', params).then(res => res.data)
}
export const roleList = params => {
  return request.post('health-soms/role/query', params).then(res => res.data)
}
export const roleEdit = params => {
  return request.put('health-soms/role', params).then(res => res.data)
}
export const roleDelete = params => {
  return request.delete('health-soms/role', params).then(res => res.data)
}

export const dealerList = params => {
  return request.post('health-soms/dealer/getDealerPage', params).then(res => res.data)
}
export const dealerAreas = params => {
  return request.get('health-basic/area/areas', params).then(res => res.data)
}
export const dealerAddd = params => {
  return request.post('health-soms/dealer/updateDealer', params).then(res => res.data)
}

export const blockResList = params => {
  return request.post('health-soms/block/getBlockPage', params).then(res => res.data)
}

export const blockResAdd = params => {
  return request.post('health-soms/block/addBlock', params).then(res => res.data)
}

export const employeeAdd = params => {
  return request.post('health-soms/employee/addEmployee', params).then(res => res.data)
}
export const employeeEdit= params => {
  return request.put('health-soms/employee/updateEmployee', params).then(res => res.data)
}

export const nationResource= params => {
  return request.get('health-basic/nation/nations', params).then(res => res.data)
}

export const nationAreas= params => {
  return request.get('health-basic/area/areas/', params).then(res => res.data)
}
export const picPath= params => {
  return request.upload('health-file/file/upload', params).then(res => res.data)
}

export const upStatus= params => {
  return request.post('health-soms/block/updateStatus', params).then(res => res.data)
}

export const blockResEdit= params => {
  return request.post('health-soms/block/updateBlock', params).then(res => res.data)
}

export const roleReslist= params => {
  return request.post('health-soms/role/query', params).then(res => res.data)
}

