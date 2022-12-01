import { message, Modal } from 'antd';
import React, { useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import type { FormInstance } from 'antd';
import type { OnlineListItem } from './data.d';
import { BasicTable } from '@/components/Table';
import { connect } from 'umi';
import { delOnline, list } from '@/services/monitor/online';
import moment from 'moment';

/**
 * 强退在线用户
 * @param tokenId
 */
const handleRemove = async (tokenId: string) => {
  const hide = message.loading('正在删除');
  if (!tokenId) return true;
  try {
    await delOnline(tokenId);
    hide();
    message.success('删除成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<FormInstance>();

  /**
   * 取消
   */
  const handleCancel = () => {};

  /**
   * 刷新
   */
  const handleRefresh = (success: boolean) => {
    if (success && actionRef.current) {
      handleCancel();
      actionRef.current.reload();
    }
  };

  const columns: ProColumns<OnlineListItem>[] = [
    {
      title: '会话编号',
      dataIndex: 'tokenId',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '登录名称',
      dataIndex: 'userName',
    },
    {
      title: '部门名称',
      dataIndex: 'deptName',
      hideInSearch: true,
    },
    {
      title: '主机',
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
      title: '操作系统',
      dataIndex: 'os',
      hideInSearch: true,
    },
    {
      title: '登录时间',
      dataIndex: 'loginTime',
      valueType: 'dateRange',
      render: (_, record) => moment(record.loginTime).format('YYYY-MM-DD HH:mm:ss'),
      hideInSearch: true,
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
            Modal.confirm({
              title: '系统提示',
              content: `是否确认强退名称为"${record.userName}"的用户？`,
              onOk: async () => {
                const success = await handleRemove(record.tokenId);
                handleRefresh(success);
              },
            });
          }}
        >
          强退
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <BasicTable<OnlineListItem, API.PageParams>
        actionRef={actionRef}
        formRef={formRef}
        rowKey="tokenId"
        search={{
          labelWidth: 120,
        }}
        request={list}
        columns={columns}
      />
    </PageContainer>
  );
};

export default connect()(TableList);
