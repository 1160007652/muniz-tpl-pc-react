import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Drawer } from 'antd';

import TransactionsItem from '_components/TransactionsItem';
import TransactionsDetail from '_containers/TransactionsDetail';

import pageURL from '_constants/pageURL';

import './index.less';

const Transactions = ({ data }) => {
  const history = useHistory();
  const [drawerInfo, setDrawerInfo] = useState({
    visible: false,
    data: null,
  });

  function handleClickItemInfo(item) {
    return () => {
      setDrawerInfo({
        visible: true,
        data: item,
      });
      // history.push({ pathname: pageURL.transactionsDetail, state: item });
    };
  }
  /** 关闭抽屉 */
  function onClose() {
    setDrawerInfo({
      visible: false,
      data: null,
    });
  }
  return (
    <div className="transactions">
      <ul className="transactions-box">
        {data &&
          data.map((item) => {
            return (
              <li onClick={handleClickItemInfo(item)} key={item.txn}>
                <TransactionsItem data={item} />
              </li>
            );
          })}
      </ul>
      <Drawer
        width="520px"
        maskClosable={true}
        destroyOnClose
        placement="right"
        closable={false}
        onClose={onClose}
        visible={drawerInfo.visible}
      >
        {drawerInfo.data && <TransactionsDetail data={drawerInfo.data} />}
      </Drawer>
    </div>
  );
};

export default Transactions;
