/*
 * URL统一管理
 */

// 联调环境接口判断
const baseUrlEnv = {
  development: '',
  production: ''
};

// http://123.207.170.54:9001/

// 请求接口地址
const baseUrl = baseUrlEnv[process.env.NODE_ENV];


// 定义URL
const URL = {
  stockList: baseUrl + '/jfsc/stock/list/{numberId}',
  orderList: baseUrl + '/jfsc/order/listbymanager/{mangId}',
  userInfo: baseUrl + '/jfsc/manager/detail/{mangId}',
  login: baseUrl + '/jfsc/auth/bind',
  logout: baseUrl + '/jfsc/auth/unbind',
  openId: baseUrl + '/jfsc/auth2/getOpenIdByCode',
  exchange: baseUrl + '/jfsc/trade/exchange',
  orderInfo: baseUrl + '/jfsc/order/orderdetail/{orderId}',
  operatyDay: baseUrl + '/jfsc/report/getchatreport/{mangId}',
  operatyInfo: baseUrl + '/jfsc/report/today/{mangId}',
  imgUrl: 'http://123.207.170.54/', // 图片地址
  authUrl: baseUrlEnv.production + '/jfsc/auth2/outh?r=-1', // 授权链接
};

export default URL;

// /jfsc/report/today/37?managerid=1&token=077bd5be0fa52e2a87de5c7801c24add


//  http://localhost:9001?managerid=1&token=077bd5be0fa52e2a87de5c7801c24add&type=3&begin=2019-09&end=2019-11


// /jfsc/order/orderdetail/1234?managerid=1&token=077bd5be0fa52e2a87de5c7801c24add

// /jfsc/auth2/getOpenIdByCode?code=33

// http://123.207.170.54:9001/jfsc/auth/unbind?managerid=1&token=077bd5be0fa52e2a87de5c7801c24add


// http://123.207.170.54:9001/jfsc/auth/bind?openid=12341234&username=xujq&sign=1q2w3e3

// http://123.207.170.54:9001/jfsc/order/listbymanager/1?managerid=1&token=2721ce99caadd229c48622a3dde9001b

// http://123.207.170.54:9001/jfsc/order/orderdetail/1234?managerid=1&token=2721ce99caadd229c48622a3dde9001b