import axios from 'axios';

// Vue.prototype.$axios = axios;
axios.defaults.withCredentials=true;

// const qs = require('qs');
const service = axios.create({
  baseURL: process.env.API_URL,
  // baseURL: 'http://172.18.19.173:7777/service/LBRESTNEW/lbObjectNew/query',
  timeout: 10000, //请求响应时间
  responseType: 'text',
  responseEncoding: 'utf-8',
  withCredentials: true
})

// // 添加一个响应拦截器
service.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  console.log(error)
  // Do something with response error
  return Promise.reject(error);
});
export default service;
