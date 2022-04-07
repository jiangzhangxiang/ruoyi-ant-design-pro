import { PlusOutlined, DeleteOutlined, UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import { Button, message, Modal } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { list, addUser, updateUser, delUser } from '@/services/ant-design-pro/system';
import UserModal from '@/pages/system/User/components/UserModal';
import { UserListItem } from '@/pages/system/User/data';

/**
 * 添加用户
 * @param fields
 */
const handleUserAdd = async (fields: UserListItem) => {
  const hide = message.loading('正在新增');
  try {
    await addUser({ ...fields });
    hide();
    message.success('新增成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 修改用户
 * @param fields
 */
const handleUpdate = async (fields: any) => {
  const hide = message.loading('正在修改');
  try {
    await updateUser({
      ...fields,
    });
    hide();
    message.success('修改成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 删除用户
 * @param userId
 */

const handleRemove = async (userId: number | number[]) => {
  const hide = message.loading('正在删除');
  if (!userId) return true;
  try {
    await delUser(userId);
    hide();
    message.success('删除成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

const TableList: React.FC = () => {
  const [userModalVisible, setUserModalVisible] = useState<boolean>(false);
  const [userModalTitle, setUserModalTitle] = useState<string>('');
  const [userModalCurrent, setUserModalCurrent] = useState<UserListItem | undefined>(undefined);
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<UserListItem[]>([]);

  /**
   *  新增
   */
  const handleAdd = () => {
    setUserModalTitle('添加用户');
    setUserModalVisible(true);
    setUserModalCurrent(undefined);
  };
  /**
   *  编辑
   */
  const handleEdit = (record: UserListItem) => {
    setUserModalVisible(true);
    setUserModalCurrent(record);
    setUserModalTitle('修改用户');
  };
  /**
   * 取消
   */
  const handleCancel = () => {
    setUserModalVisible(false);
    setUserModalCurrent(undefined);
  };

  /**
   * 刷新页面
   */
  const handleRefresh = (success: boolean) => {
    if (success && actionRef.current) {
      setSelectedRows([]);
      handleCancel();
      actionRef.current.reload();
    }
  };

  const handleDelModal = (userIds: number | number[]) => {
    Modal.confirm({
      title: '系统提示',
      content: `是否确认删除用户编号为"${userIds}"的数据项？`,
      onOk: async () => {
        const success = await handleRemove(userIds);
        if (success) handleRefresh(success);
      },
    });
  };

  const columns: ProColumns<UserListItem>[] = [
    {
      title: '用户编号',
      dataIndex: 'userId',
    },
    {
      title: '用户名称',
      dataIndex: 'userName',
    },
    {
      title: '用户昵称',
      dataIndex: 'nickName',
    },
    {
      title: '部门',
      dataIndex: 'dept.deptName',
      renderText: (_, record) => record.dept?.deptName,
    },
    {
      title: '手机号码',
      dataIndex: 'phonenumber',
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        0: {
          text: '启用',
          status: 'Processing',
        },
        1: {
          text: '停用',
          status: 'Default',
        },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 240,
      render: (_, record) => [
        <a
          key="edit"
          onClick={() => {
            handleEdit(record);
          }}
        >
          修改
        </a>,
        <a
          key="del"
          onClick={() => {
            handleDelModal(record.userId);
          }}
        >
          删除
        </a>,
        <a key="pwd">重置密码</a>,
        <a key="role">分配角色</a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<UserListItem, API.PageParams>
        actionRef={actionRef}
        rowKey="userId"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={handleAdd}>
            <PlusOutlined /> 新建
          </Button>,
          <Button
            danger
            disabled={!selectedRowsState.length}
            key="primary"
            onClick={() => {
              const userIds = selectedRowsState.map((m) => m.userId);
              handleDelModal(userIds);
            }}
          >
            <DeleteOutlined /> 删除
          </Button>,
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setUserModalVisible(true);
            }}
          >
            <UploadOutlined /> 导入
          </Button>,
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setUserModalVisible(true);
            }}
          >
            <DownloadOutlined /> 导出
          </Button>,
        ]}
        request={async (params = {}) => {
          return list({
            ...params,
          }).then((res) => {
            return {
              data: res.rows,
              total: res.total,
            };
          });
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      <UserModal
        visible={userModalVisible}
        current={userModalCurrent}
        onSubmit={async (fields) => {
          const success = await (userModalCurrent?.userId
            ? handleUpdate({ ...userModalCurrent, ...fields })
            : handleUserAdd({ ...userModalCurrent, ...fields }));
          handleRefresh(success);
        }}
        onCancel={handleCancel}
        title={userModalTitle}
      />
    </PageContainer>
  );
};

export default TableList;
