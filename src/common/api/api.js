import request from '../axios/axios'

// export function requestApi(methodName,params){
//     let reParams = {
//       "objectName": methodName,
//       "params": params,
//       "queryOption":{"batchNo":1,"batchSize":100,"queryCount":true}
//     }
//     let formData = new FormData();
//     formData.append("requestData",JSON.stringify(reParams))
//     return request({
//       method: 'post',
//       data: reParams,
//     })
// }

export const requestApi = (methodName,params) => { 
  let reParams = {
    "objectName": methodName,
    "params": params,
    "queryOption":{"batchNo":1,"batchSize":1000,"queryCount":true}
  }
  let formData = new FormData();
  formData.append("requestData", JSON.stringify(reParams))
  return request({
    url: 'service/LBRESTNEW/lbObjectNew/query',
    method: 'post',
    data: formData
  })
}

export const submitApi = (methodName,params,id) => { 
  let reParams = {
    "bizProcessName": methodName,
    "params": params,
    "id": id,
    // "queryOption":{"batchNo":1,"batchSize":100,"queryCount":true}
  }
  let formData = new FormData();
  formData.append("requestData", JSON.stringify(reParams))
  return request({
    url: 'service/LBRESTNEW/bizNew/execProcess',
    method: 'post',
    data: formData
  })
}

export const uploadApi = (params) => { 
  let formData = new FormData();
  formData.append('reportFile', params);
  return request({
    url: 'plugin/apop/ruisi/imageUpload.do?entityName=entity_test',
    method: 'post',
    data: formData
  })
}