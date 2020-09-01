import React, { useState, Fragment } from 'react';
import { MobXProviderContext, observer } from 'mobx-react';
import intl from 'react-intl-universal';
import { Table, Button, Input, Popconfirm, Form, Badge, Select } from 'antd';

import RestoreNickName from '_containers/RestoreNickName';
import './index.less';

const EditableCell = ({ editing, dataIndex, title, inputType, record, index, children, ...restProps }) => {
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          <Input />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const NickNameList = () => {
  const { nickNameStore } = React.useContext(MobXProviderContext);
  const tableColors = {};
  const [form] = Form.useForm();
  const data = nickNameStore.nickNameList;
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record.assetCode === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      nickname: '',
      ...record,
    });
    setEditingKey(record.assetCode);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.assetCode);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        // setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        // setData(newData);
        setEditingKey('');
      }

      console.log('新数据 =》', newData);
      nickNameStore.importNickNameList({ nickNameList: newData });
    } catch (errInfo) {
      console.log('修改资产昵称失败:', errInfo);
    }
  };

  /** 切换重复后的下拉 nickname */
  function handleSelectNickname(record) {
    return (value) => {
      const result = nickNameStore.nickNameList.map((item) => {
        if (item.assetCode === record.assetCode) {
          item.nickname = value;
          item.nicknames = [];
        }
        return item;
      });

      nickNameStore.importNickNameList({ nickNameList: result });
    };
  }

  const columns = [
    {
      title: intl.get('asset_name_long'),
      dataIndex: 'assetCode',
      editable: false,
      render: (assetCode) => {
        return <div className="equal-font">{assetCode}</div>;
      },
    },
    {
      title: intl.get('asset_name_short'),
      dataIndex: 'nickname',
      width: '25%',
      editable: true,
      render(nickname, record) {
        let index = 0;

        data.forEach((item) => {
          if (item.nickname === nickname) {
            index = index + 1;
          }
        });

        if (index > 1) {
          let tmpColor = randomColor();

          // 防止出现重复的 色值
          while (Object.values(tableColors).includes(tmpColor)) {
            tmpColor = randomColor();
          }

          if (!Object.keys(tableColors).includes(nickname)) {
            tableColors[nickname] = tmpColor;
          }
        }
        return (
          <div className="nickname-td">
            {record.nicknames.length < 2 ? (
              <div style={{ backgroundColor: index > 1 ? tableColors[nickname] : 'transparent' }}>{nickname}</div>
            ) : (
              <Badge count={record.nicknames.length} size="small" className="badge-nickname" overflowCount={10}>
                <Select
                  value={nickname}
                  style={{ width: '100%', backgroundColor: index > 1 ? tableColors[nickname] : 'transparent' }}
                  onSelect={handleSelectNickname(record)}
                >
                  {record.nicknames.map((item) => {
                    return (
                      <Select.Option value={item} key={item}>
                        {item}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Badge>
            )}
          </div>
        );
      },
    },
    {
      title: intl.get('operation'),
      dataIndex: 'operation',
      width: '25%',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                save(record.assetCode);
              }}
              style={{
                marginRight: 8,
              }}
            >
              {intl.get('save')}
            </a>
            <Popconfirm title={intl.get('isCancel')} onConfirm={cancel}>
              <a>{intl.get('cancel')}</a>
            </Popconfirm>
          </span>
        ) : (
          <a disabled={editingKey !== ''} onClick={() => edit(record)}>
            {intl.get('edit')}
          </a>
        );
      },
    },
  ];

  /** 随机取色值 rgba */
  function randomColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgba(${r},${g},${b},0.6)`;
  }
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  /** 保存文件 */
  function handleOnClickTableBtnSave() {
    const blob = new Blob([JSON.stringify(nickNameStore.nickNameList)], {
      type: 'findoranicknames/plain;charset=utf-8',
    });
    const fileData = new File([blob], `findoraNickNames.findoranicknames`, {
      type: 'findoranicknames/plain;charset=utf-8',
    });
    chrome.downloads.download({
      filename: fileData.name,
      saveAs: true,
      conflictAction: 'overwrite',
      url: window.URL.createObjectURL(fileData),
      method: 'GET',
    });
  }
  /** 删除文件 */
  function handleOnClickTableBtnRemove() {
    nickNameStore.importNickNameList({ nickNameList: [] });
  }
  function TableHeader() {
    return (
      <div className="nickname-table-header">
        <Button style={{ marginRight: '12px' }} onClick={handleOnClickTableBtnSave}>
          {intl.get('save')}
        </Button>
        <Button style={{ marginRight: '12px' }} onClick={handleOnClickTableBtnRemove}>
          {intl.get('remove')}
        </Button>
        <RestoreNickName size="small" />
      </div>
    );
  }

  function NickNameListComponent() {
    return (
      <div key={nickNameStore.nickNameList.length}>
        <Form form={form} component={false}>
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={data}
            columns={mergedColumns}
            rowClassName="editable-row"
            rowKey="assetCode"
            title={TableHeader}
            pagination={{
              onChange: cancel,
              hideOnSinglePage: true,
              pageSize: 8,
            }}
          />
        </Form>
      </div>
    );
  }

  return (
    <div className="findora-nickname-list">
      {nickNameStore.nickNameList.length > 0 ? NickNameListComponent() : <RestoreNickName size="large" />}
    </div>
  );
};

export default observer(NickNameList);
