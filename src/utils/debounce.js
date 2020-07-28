/** @module utils/debounce */

/**
 * 防抖
 * @param {func} func 函数
 * @param {number} wait 等待时间
 */
/**
 * Debounces.
 * @param {func} func - Function to debounce.
 * @param {number} wait - Time to wait.
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
