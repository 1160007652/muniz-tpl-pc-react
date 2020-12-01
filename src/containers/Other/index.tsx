import React from 'react';
import { Button } from 'antd';
import { MobXProviderContext, observer } from 'mobx-react';

import './index.less';

const Other: React.FC = () => {
  // const { testStore } = React.useContext(MobXProviderContext);
  // const handleAddCount = () => {
  //   testStore.increment();
  // };
  return (
    <div className="other">
      sadas
      {/* <div> Mobx testStore count value: {testStore.count}</div>
      <div style={{ color: 'red' }}>asa2222aah</div>
      <Button onClick={handleAddCount}>add Count</Button> */}
    </div>
  );
};
export default observer(Other);
