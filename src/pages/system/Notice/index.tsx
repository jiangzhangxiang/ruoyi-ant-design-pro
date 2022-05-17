import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, message, Modal } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import type { FormInstance } from 'antd';
import { list, addConfig, updateConfig, delConfig } from '@/services/ant-design-pro/system/config';
import ConfigModal from './components/ConfigModal';
import type { ConfigListItem } from './data.d';
import { BasicTable } from '@/components/Table';
import { connect } from 'umi';
import useDict from '@/hooks/useDict';
import { addDateRange } from '@/utils';

/**
 * 添加用户
 * @param fields
 */
const handleUserAdd = async (fields: ConfigListItem) => {
  const hide = message.loading('正在新增');
  try {
    await addConfig({ ...fields });
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
    await updateConfig({
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
 * @param configId
 */

const handleRemove = async (configId: number | number[]) => {
  const hide = message.loading('正在删除');
  if (!configId) return true;
  try {
    await delConfig(configId);
    hide();
    message.success('删除成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

const TableList: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>('');
  const [modalCurrent, setModalCurrent] = useState<ConfigListItem>({});
  const actionRef = useRef<ActionType>();
  const formRef = useRef<FormInstance>();
  const [selectedRowsState, setSelectedRows] = useState<number[]>([]);
  const { sys_yes_no } = useDict({
    dictType: ['sys_yes_no'],
  });
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

  const handleDelModal = (configIds: number | number[]) => {
    Modal.confirm({
      title: '系统提示',
      content: `是否确认删除用户编号为"${configIds}"的数据项？`,
      onOk: async () => {
        const success = await handleRemove(configIds);
        handleRefresh(success);
      },
    });
  };

  const columns: ProColumns<ConfigListItem>[] = [
    {
      title: '参数主键',
      dataIndex: 'configId',
      hideInSearch: true,
    },
    {
      title: '参数名称',
      dataIndex: 'configName',
      ellipsis: true,
    },
    {
      title: '参数键名',
      dataIndex: 'configKey',
      ellipsis: true,
    },
    {
      title: '参数键值',
      dataIndex: 'configValue',
      hideInSearch: true,
    },
    {
      title: '是否系统内置',
      dataIndex: 'configType',
      valueEnum: sys_yes_no?.valueEnum,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateRange',
      render: (_, record) => record.createTime,
      search: {
        transform: (value: any) => addDateRange(value),
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 120,
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
            handleDelModal(record.configId as number);
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <BasicTable<ConfigListItem, API.PageParams>
        actionRef={actionRef}
        formRef={formRef}
        rowKey="configId"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="add"
            onClick={() => {
              setModalType('add');
              setModalVisible(true);
              setModalCurrent({});
            }}
          >
            <PlusOutlined /> 新增
          </Button>,
          <Button
            danger
            disabled={!selectedRowsState.length}
            key="del"
            onClick={() => {
              handleDelModal(selectedRowsState as number[]);
            }}
          >
            <DeleteOutlined /> 删除
          </Button>,
        ]}
        request={list}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows.map((m) => m.configId) as number[]);
          },
          preserveSelectedRowKeys: true,
          selectedRowKeys: selectedRowsState,
        }}
      />
      <ConfigModal
        visible={modalVisible}
        current={modalCurrent}
        onSubmit={async (fields) => {
          const success = await (modalCurrent?.configId
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
