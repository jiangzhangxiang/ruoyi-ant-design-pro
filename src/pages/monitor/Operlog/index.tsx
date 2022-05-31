import { DeleteOutlined, DownloadOutlined } from '@ant-design/icons';
import { Button, message, Modal } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import type { FormInstance } from 'antd';
import { list, delOperlog, clearOperlog } from '@/services/monitor/operlog';
import OperlogModal from './components/OperlogModal';
import type { OperlogListItem } from './data';
import { download } from '@/services/api';

import { BasicTable } from '@/components/Table';
import { connect } from 'umi';
import useDict from '@/hooks/useDict';
import { addDateRange } from '@/utils';

/**
 * 删除操作日志
 * @param userId
 */

const handleRemove = async (userId: number | number[]) => {
  const hide = message.loading('正在删除');
  if (!userId) return true;
  try {
    await delOperlog(userId);
    hide();
    message.success('删除成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 清空操作日志
 */

const handleClear = async () => {
  const hide = message.loading('清空删除');
  try {
    await clearOperlog();
    hide();
    message.success('清空成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};
const TableList: React.FC = () => {
  const { sys_common_status, sys_oper_type } = useDict({
    dictType: ['sys_common_status', 'sys_oper_type'],
  });
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>('');
  const [modalCurrent, setModalCurrent] = useState<OperlogListItem>({});
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

  const handleDelModal = (ids: number | number[]) => {
    Modal.confirm({
      title: '系统提示',
      content: `是否确认删除岗位编号为"${ids}"的数据项？`,
      onOk: async () => {
        const success = await handleRemove(ids);
        handleRefresh(success);
      },
    });
  };
  const handleClearModal = () => {
    Modal.confirm({
      title: '系统提示',
      content: `是否确认清空所有操作日志数据项？`,
      onOk: async () => {
        const success = await handleClear();
        handleRefresh(success);
      },
    });
  };
  const columns: ProColumns<OperlogListItem>[] = [
    {
      title: '日志编号',
      dataIndex: 'operId',
      hideInSearch: true,
    },
    {
      title: '系统模块',
      dataIndex: 'title',
    },
    {
      title: '操作类型',
      dataIndex: 'operatorType',
      valueEnum: sys_oper_type?.valueEnum,
    },
    {
      title: '请求方式',
      dataIndex: 'requestMethod',
      hideInSearch: true,
    },
    {
      title: '操作人员',
      dataIndex: 'operName',
    },
    {
      title: '操作地址',
      dataIndex: 'operIp',
      hideInSearch: true,
    },
    {
      title: '操作地点',
      dataIndex: 'operLocation',
      hideInSearch: true,
    },
    {
      title: '操作状态',
      dataIndex: 'status',
      valueEnum: sys_common_status?.valueEnum,
    },
    {
      title: '操作时间',
      dataIndex: 'operTime',
      valueType: 'dateRange',
      render: (_, record) => record.operTime,
      search: {
        transform: (value: any) => addDateRange(value),
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 80,
      render: (_, record) => [
        <a
          key="edit"
          onClick={() => {
            setModalVisible(true);
            setModalCurrent(record);
            setModalType('details');
          }}
        >
          详细
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <BasicTable<OperlogListItem, API.PageParams>
        actionRef={actionRef}
        formRef={formRef}
        rowKey="operId"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            danger
            disabled={!selectedRowsState.length}
            key="delete"
            onClick={() => {
              handleDelModal(selectedRowsState as number[]);
            }}
          >
            <DeleteOutlined /> 删除
          </Button>,
          <Button
            danger
            key="clear"
            onClick={() => {
              handleClearModal();
            }}
          >
            <DeleteOutlined /> 清空
          </Button>,
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              const params = formRef.current?.getFieldsValue();
              download('/system/operlog/export', params, `operlog_${new Date().getTime()}.xlsx`);
            }}
          >
            <DownloadOutlined /> 导出
          </Button>,
        ]}
        request={list}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows.map((m) => m.operId) as number[]);
          },
          preserveSelectedRowKeys: true,
          selectedRowKeys: selectedRowsState,
        }}
      />
      <OperlogModal
        columns={columns}
        visible={modalVisible}
        current={modalCurrent}
        onCancel={handleCancel}
        type={modalType}
      />
    </PageContainer>
  );
};

export default connect()(TableList);
