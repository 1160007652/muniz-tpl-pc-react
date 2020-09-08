import React from 'react';
import { toJS } from 'mobx';
import { MobXProviderContext, observer } from 'mobx-react';
import { Input, Radio, InputNumber, Menu, Dropdown, Drawer } from 'antd';
import intl from 'react-intl-universal';
import { useImmer } from 'use-immer';

import SendConfrim from '_containers/SendConfrim';
import FindoraWebContainer from '_components/FindoraWebContainer';
import FindoraButton from '_components/FindoraButton';
import FindoraBoxView from '_components/FindoraBoxView';
import SwitchAddress from '_containers/SwitchAddress';
import SwitchAssetName from '_containers/SwitchAssetName';
import Balance from '_containers/Balance';
import FindoraTips from '_components/FindoraTips';

import pageURL from '_constants/pageURL';

import './index.less';

const Send = () => {
  const { walletStore, assetStore } = React.useContext(MobXProviderContext);
  const { send: drawerInfo } = assetStore.drawerInfo;
  const [blindError, setBlindError] = useImmer({
    isTypeError: null,
  });
  const [error, setError] = useImmer({
    assetNameError: null,
    amountError: '',
    toError: '',
  });
  const [data, setData] = useImmer({
    walletInfo: toJS(walletStore.walletInfo),
    from: walletStore.walletInfo.publickey,
    to: '',
    asset: {},
    numbers: '',
    blind: {
      isAmount: true,
      isType: true,
    },
  });

  function handleClickItemInfo() {
    handleError(['numbers', 'to'], () => {
      assetStore.toggleDrawer('send', true);
    })();
  }
  /** 资产名称选中事件, 回调结果 */
  function handleChangeSelectAssetName(value) {
    const asset_rules = {
      asset_rules: {
        max_units: null,
        tracing_policies: null,
        transfer_multisig_rules: null,
        transferable: true,
        updatable: false,
      },
      ...value.asset,
    };
    if ('numbers' in value.asset) {
      setError((state) => {
        state.assetNameError = null;
      });
    } else {
      setError((state) => {
        state.assetNameError = { type: 'error', msg: 'send_error6' };
      });
      return;
    }

    // 可跟踪资产 不可以隐藏 code - blind_type
    if (asset_rules.asset_rules.tracing_policies) {
      setBlindError((state) => {
        state.isTypeError = 'send_error7';
      });
      setData((state) => {
        state.blind.isType = false;
      });
    } else {
      setBlindError((state) => {
        state.isTypeError = null;
      });
      setData((state) => {
        state.blind.isType = true;
      });
    }

    // && data.from !== value?.issuer?.key
    if (!asset_rules.asset_rules.transferable) {
      setError((state) => {
        state.assetNameError = { type: 'info', msg: 'send_error2' };
      });
    } else {
      setError((state) => {
        state.assetNameError = null;
      });
    }

    setData((state) => {
      state.asset = { ...state.asset, ...asset_rules };
      state.numbers = '';
    });
  }
  /** 切换钱包 from 地址 */
  function handleChangeSwitchAddress(address) {
    // if (address === data.to) {
    //   setError((state) => {
    //     state.toError = 'send_nosubmit_owne_tips';
    //   });
    // }
    setData((state) => {
      state.from = address;
      state.to = address === state.to ? '' : state.to;
    });
  }
  /** 输入 To 地址 */
  function handleChangeTo(e) {
    e.persist();
    const to = e.target.value;
    setError((state) => {
      state.toError = null;
    });
    setData((state) => {
      state.to = to;
    });
  }
  /** 选择To 下拉菜单, 切换地址 */
  function handleOnClickToAddress(item) {
    return () => {
      setData((state) => {
        state.to = item.publickey;
      });
      setError((state) => {
        state.toError = null;
      });
    };
  }

  function handleError(fileds, fn) {
    return () => {
      const { asset, numbers, to } = data;
      let isError = false;

      // 判断 inputNumbers , 发行资产不能为空
      if (fileds.includes('numbers')) {
        const amount = asset?.numbers ?? 0;
        if (numbers) {
          if (numbers > amount) {
            setError((state) => {
              state.amountError = { type: 'info', msg: 'send_error3' };
            });
            isError = true;
          } else {
            setError((state) => {
              state.amountError = null;
            });
          }
        } else {
          isError = true;
          setError((state) => {
            state.amountError = { type: 'error', msg: 'send_error5' };
          });
        }
      }

      // 判断 T哦地址
      if (fileds.includes('to')) {
        if (!to) {
          setError((state) => {
            state.toError = 'send_error4';
          });
          isError = true;
        } else if (to === data.from) {
          setError((state) => {
            state.toError = 'send_nosubmit_owne_tips';
          });
          isError = true;
        } else {
          setError((state) => {
            state.toError = null;
          });
        }
      }

      // 提交
      if (fn && !isError) {
        fn();
      }
    };
  }

  /** 输入 Amount  */
  function handleChangeAmount(value) {
    setError((state) => {
      state.amountError = null;
    });

    setData((state) => {
      state.numbers = value;
    });
  }
  /** 更新 Radio 选择 */
  function handleChangeRadio(key) {
    return (e) => {
      setData((state) => {
        state.blind[key] = e.target.value;
      });
    };
  }

  function limitDecimals(value) {
    return Number(String(value).replace(/^(0+)|[^\d]+/g, '')) || '';
  }
  function ToMenu() {
    return (
      <Menu>
        {walletStore.walletImportList.map((item) => {
          if (item.publickey !== data.from) {
            return (
              <Menu.Item key={item.publickey} onClick={handleOnClickToAddress(item)}>
                {item.keyStore.name}
              </Menu.Item>
            );
          } else {
            return null;
          }
        })}
      </Menu>
    );
  }
  /** 关闭drawer */
  function onClose() {
    assetStore.toggleDrawer('send', false);
  }

  return (
    <FindoraWebContainer className="send" title={intl.get('page_send_title')}>
      {/* <FindoraHeader title={intl.get('page_send_title')} isShowBack menu={<HeaderMenu />} /> */}
      <div className="send-box">
        <FindoraBoxView title={intl.get('from')}>
          <SwitchAddress
            isShortAddress
            dataList={walletStore.walletImportList}
            curAddress={data.from}
            onChange={handleChangeSwitchAddress}
          />
        </FindoraBoxView>
        <FindoraBoxView title={intl.get('to')}>
          <Dropdown overlay={ToMenu}>
            <Input
              placeholder="Please to address"
              value={data.to}
              className="address"
              onChange={handleChangeTo}
              onBlur={handleError(['to'])}
            />
          </Dropdown>
          {error.toError && <div className="error">{intl.get(error.toError)}</div>}
        </FindoraBoxView>

        <FindoraBoxView title={intl.get('asset_name')}>
          <SwitchAssetName
            key={drawerInfo.componentKey}
            onResult={handleChangeSelectAssetName}
            address={data.from}
            actionTYpe={SwitchAssetName.ACTION_TYPE.SEND}
          />
          {error.assetNameError?.type === 'info' && <div className="info">{intl.get(error.assetNameError.msg)}</div>}
        </FindoraBoxView>

        <FindoraBoxView title={intl.get('send_amount')}>
          <div className="send-balance">
            <span>{intl.get('send_amount_max')}</span>
            <Balance asset={data.asset} style={{ textAlign: 'right' }} key={data.asset.long} />
          </div>
          <InputNumber
            placeholder={intl.get('send_mount_placeholder')}
            value={data.numbers}
            min={0}
            max={data.asset.numbers}
            step={1}
            style={{ width: '100%' }}
            onChange={handleChangeAmount}
            onBlur={handleError(['numbers'])}
            formatter={limitDecimals}
            parser={limitDecimals}
          />

          {error.amountError && <div className={error.amountError.type}>{intl.get(error.amountError.msg)}</div>}
        </FindoraBoxView>
        <FindoraBoxView
          title={<FindoraTips desc={intl.get('blind_amount_tips')}>{intl.get('blind_amount')}</FindoraTips>}
          isRow
          titleDirection="top"
        >
          <Radio.Group value={data.blind.isAmount} onChange={handleChangeRadio('isAmount')}>
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </FindoraBoxView>
        <FindoraBoxView
          title={<FindoraTips desc={intl.get('blind_type_tips')}>{intl.get('blind_type')}</FindoraTips>}
          isRow
        >
          <Radio.Group
            value={data.blind.isType}
            disabled={blindError.isTypeError}
            onChange={handleChangeRadio('isType')}
          >
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
          {blindError.isTypeError && <div className="error">{intl.get(blindError.isTypeError)}</div>}
        </FindoraBoxView>

        <div className="btn-area">
          <FindoraButton className="btn" onClick={handleClickItemInfo}>
            Next
          </FindoraButton>
        </div>

        <Drawer
          width="520px"
          maskClosable={true}
          destroyOnClose
          placement="right"
          closable={false}
          onClose={onClose}
          visible={drawerInfo.visible}
        >
          <SendConfrim data={data} />
        </Drawer>
      </div>
    </FindoraWebContainer>
  );
};

export default observer(Send);
