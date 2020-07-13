/**
 * @ Author: Muniz
 * @ Create Time: 2020-07-13 13:46:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-13 13:47:26
 * @ Description: 防抖, 立即执行
 */

export default function debounce(func, wait) {
  let timer = null;
  return function () {
    let context = this;
    let args = arguments;
    if (timer) clearTimeout(timer);
    let callnow = !timer;
    timer = setTimeout(function () {
      timer = null;
    }, wait);
    if (callnow) func.apply(context, args);
  };
}
