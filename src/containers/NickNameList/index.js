import React, { useState } from 'react';
import { MobXProviderContext, observer } from 'mobx-react';

import { Table, Button, Input, Popconfirm, Form } from 'antd';

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

  const columns = [
    {
      title: 'Asset Code',
      dataIndex: 'assetCode',
      editable: false,
    },
    {
      title: 'Nickname',
      dataIndex: 'nickname',
      width: '25%',
      editable: true,
      render: (nickname) => {
        let index = 0;

        data.forEach((item) => {
          if (item.nickname === nickname) {
            index = index + 1;
          }
        });

        console.log('xxxxx', index);

        return <div style={{ backgroundColor: index > 1 ? 'red' : 'transparent' }}>{nickname}</div>;
      },
    },
    {
      title: 'Operation',
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
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <a disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </a>
        );
      },
    },
  ];

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
          Save
        </Button>
        <Button style={{ marginRight: '12px' }} onClick={handleOnClickTableBtnRemove}>
          Remove
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
