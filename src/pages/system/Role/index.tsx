import { PlusOutlined, DeleteOutlined, UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import { Button, message, Modal } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import type { FormInstance } from 'antd';
import { addUser, updateUser, delUser, list } from '@/services/ant-design-pro/system/role';
import RoleModal from './components/RoleModal';
import type { RoleListItem } from './data.d';
import { download } from '@/services/ant-design-pro/api';
import { BasicTable } from '@/components/Table';
import { connect } from 'umi';
import useDict from '@/hooks/useDict';

/**
 * 添加角色
 * @param fields
 */
const handleUserAdd = async (fields: RoleListItem) => {
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
  const { sys_normal_disable } = useDict({
    dictType: ['sys_normal_disable'],
  });
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>('');
  const [modalCurrent, setModalCurrent] = useState<RoleListItem>({});
  const actionRef = useRef<ActionType>();
  const formRef = useRef<FormInstance>();
  const [selectedRowsState, setSelectedRows] = useState<number[]>([]);
  /**
   * 取消
   */
  const handleCancel = () => {
    setModalVisible(false);
    setModalType('');
    setModalCurrent({});
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
        handleRefresh(success);
      },
    });
  };

  const columns: ProColumns<RoleListItem>[] = [
    {
      title: '角色编号',
      dataIndex: 'roleId',
      hideInSearch: true,
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
    },
    {
      title: '权限字符',
      dataIndex: 'roleKey',
    },
    {
      title: '显示排序',
      dataIndex: 'roleSort',
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: sys_normal_disable?.valueEnum,
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
            setModalVisible(true);
            setModalCurrent(record);
            setModalType('edit');
          }}
        >
          修改
        </a>,
        <a
          key="del"
          onClick={() => {
            handleDelModal(record.roleId as number);
          }}
        >
          删除
        </a>,
        <a key="role">分配角色</a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <BasicTable<RoleListItem, API.PageParams>
        actionRef={actionRef}
        formRef={formRef}
        rowKey="userId"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setModalType('add');
              setModalVisible(true);
              setModalCurrent({});
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
          <Button
            danger
            disabled={!selectedRowsState.length}
            key="primary"
            onClick={() => {
              handleDelModal(selectedRowsState as number[]);
            }}
          >
            <DeleteOutlined /> 删除
          </Button>,
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setModalVisible(true);
            }}
          >
            <UploadOutlined /> 导入
          </Button>,
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              const params = formRef.current?.getFieldsValue();
              download('/api/system/user/export', params, `user_${new Date().getTime()}.xlsx`);
            }}
          >
            <DownloadOutlined /> 导出
          </Button>,
        ]}
        request={list}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows.map((m) => m.roleId) as number[]);
          },
          preserveSelectedRowKeys: true,
          selectedRowKeys: selectedRowsState,
        }}
      />
      <RoleModal
        visible={modalVisible}
        current={modalCurrent}
        onSubmit={async (fields) => {
          const success = await (modalCurrent?.roleId
            ? handleUpdate({ ...modalCurrent, ...fields })
            : handleUserAdd({ ...modalCurrent, ...fields }));
          handleRefresh(success);
        }}
        onCancel={handleCancel}
        type={modalType}
      />
    </PageContainer>
  );
};

export default connect()(TableList);
