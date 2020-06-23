/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-23 13:53:47
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-23 13:58:11
 * @ Description: 修改 DOM 的 公共方法
 */

const Dom = {
  /** 修改DOM元素 大小 */
  changeRootSize: () => {
    const RootDom = document.querySelector('#root');
    RootDom.style.width = '100%';
    RootDom.style.height = '100vh';
  },
};

export default Dom;
