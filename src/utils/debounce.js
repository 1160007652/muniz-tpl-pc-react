/** @module utils/debounce */

/**
 * 防抖, 立即执行
 * @param {func} func 函数
 * @param {number} wait 等待时间
 */
function debounce(func, wait) {
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

export default debounce;
