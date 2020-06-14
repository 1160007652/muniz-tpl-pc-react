/*
 * URL统一管理
 */

// 联调环境接口判断
const baseUrlEnv = {
  development: '',
  production: '',
};

// 请求接口地址
const baseUrl = baseUrlEnv[process.env.NODE_ENV];

// 定义URL
const URL = {
  stockList: baseUrl + '/jfsc/stock/list/{numberId}',
};

export default URL;
