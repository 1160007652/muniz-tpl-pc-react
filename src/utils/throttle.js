/** @module utils/throttle */

/**
 * 事件节流
 * @param {function} func 函数
 * @param {number} wait 等待时间
 */
/**
 * Throttles events.
 * @param {function} func - Function.
 * @param {number} wait - Time to wait.
 */
function throttle(func, wait) {
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
export default throttle;
