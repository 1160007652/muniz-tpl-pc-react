/** @module utils/dom */

const Dom = {
  /** 修改DOM元素 大小 */
  changeRootSize: () => {
    const RootDom = document.querySelector('#root');
    RootDom.style.width = '100%';
    RootDom.style.height = '100vh';
  },
};

export default Dom;
