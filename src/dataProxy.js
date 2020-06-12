/**
 * http请求的统一出口，方便统一处理，暂时透传。
 */

import axios from 'axios';

// axios.defaults.headers.common['Authorization'] = localStorage.getItem('token') || '';
// axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.common.timeout = 10000;

// 处理统一处理
// axios.interceptors.response.use((response) => {
//   const { data } = response;
//   if (String(data.code) === '0') {
//     return response.data.data;
//   }
//   return Promise.reject(response.data); // .data;
// }, error => Promise.reject(error));

export default axios;
