import { DeleteOutlined, DownloadOutlined } from '@ant-design/icons';
import { Button, message, Modal } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import type { FormInstance } from 'antd';
import { list, delOperlog, clearLogininfor } from '@/services/monitor/logininfor';
import type { OperlogListItem } from './data';
import { download } from '@/services/api';
import { BasicTable } from '@/components/Table';
import { connect } from 'umi';
import useDict from '@/hooks/useDict';
import { addDateRange } from '@/utils';

/**
 * 删除登录日志
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
 * 清空登录日志
 */

const handleClear = async () => {
  const hide = message.loading('正在清空');
  try {
    await clearLogininfor();
    hide();
    message.success('清空成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};
const TableList: React.FC = () => {
  const { sys_common_status } = useDict({
    dictType: ['sys_common_status'],
  });
  const actionRef = useRef<ActionType>();
  const formRef = useRef<FormInstance>();
  const [selectedRowsState, setSelectedRows] = useState<number[]>([]);

  /**
   * 刷新页面
   */
  const handleRefresh = (success: boolean) => {
    if (success && actionRef.current) {
      setSelectedRows([]);
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
      content: `是否确认清空所有登录日志数据项？`,
      onOk: async () => {
        const success = await handleClear();
        handleRefresh(success);
      },
    });
  };
  const columns: ProColumns<OperlogListItem>[] = [
    {
      title: '访问编号',
      dataIndex: 'infoId',
      hideInSearch: true,
    },
    {
      title: '用户名称',
      dataIndex: 'userName',
    },
    {
      title: '登录地址',
      dataIndex: 'ipaddr',
    },
    {
      title: '登录地点',
      dataIndex: 'loginLocation',
      hideInSearch: true,
    },
    {
      title: '浏览器',
      dataIndex: 'browser',
      hideInSearch: true,
    },
    {
      title: '登录系统',
      dataIndex: 'os',
      hideInSearch: true,
    },
    {
      title: '登录状态',
      dataIndex: 'status',
      valueEnum: sys_common_status?.valueEnum,
    },
    {
      title: '登录信息',
      dataIndex: 'msg',
      hideInSearch: true,
    },
    {
      title: '登录时间',
      dataIndex: 'loginTime',
      valueType: 'dateRange',
      render: (_, record) => record.loginTime,
      search: {
        transform: (value: any) => addDateRange(value),
      },
    },
  ];

  return (
    <PageContainer>
      <BasicTable<OperlogListItem, API.PageParams>
        actionRef={actionRef}
        formRef={formRef}
        rowKey="infoId"
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
            key="export"
            onClick={() => {
              const params = formRef.current?.getFieldsValue();
              download(
                '/monitor/logininfor/export',
                params,
                `logininfor_${new Date().getTime()}.xlsx`,
              );
            }}
          >
            <DownloadOutlined /> 导出
          </Button>,
        ]}
        request={list}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows.map((m) => m.infoId) as number[]);
          },
          preserveSelectedRowKeys: true,
          selectedRowKeys: selectedRowsState,
        }}
      />
    </PageContainer>
  );
};

export default connect()(TableList);
