/**
 * http请求的统一出口，方便统一处理，暂时透传。
 */

import axios from 'axios';
import axiosRetry from 'axios-retry';
// import { message } from 'antd';

// 重链请求次数
axiosRetry(axios, { retries: 3 });

axios.defaults.headers.common.timeout = 10000;

// 处理统一处理
axios.interceptors.response.use(
  (response) => {
    // const { data } = response;
    // if (String(data.code) === '200') {
    //   return response.data;
    // }

    return response; //Promise.reject(response.data); // .data;
  },
  (error) => {
    alert(error);
    // message.error(error);
    return Promise.reject(error);
  },
);

export default axios;
