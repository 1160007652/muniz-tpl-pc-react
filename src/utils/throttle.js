/**
 * @ Author: Muniz
 * @ Create Time: 2020-07-13 13:42:40
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-13 13:43:49
 * @ Description: 事件节流
 */

export default function throttle(func, wait) {
  let timer = null;
  return function () {
    if (!timer) return false;
    let context = this;
    let args = arguments;
    timer = setTimeout(function () {
      clearTimeout(timer);
      func.apply(context, args);
    }, wait);
  };
}
