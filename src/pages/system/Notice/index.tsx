import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, message, Modal } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import type { FormInstance } from 'antd';
import { list, addNotice, updateNotice, delNotice } from '@/services/ant-design-pro/system/notice';
import NoticeModal from './components/NoticeModal';
import type { NoticeListItem } from './data.d';
import { BasicTable } from '@/components/Table';
import { connect } from 'umi';
import useDict from '@/hooks/useDict';

/**
 * 添加公告
 * @param fields
 */
const handleUserAdd = async (fields: NoticeListItem) => {
  const hide = message.loading('正在新增');
  try {
    await addNotice({ ...fields });
    hide();
    message.success('新增成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 修改公告
 * @param fields
 */
const handleUpdate = async (fields: any) => {
  const hide = message.loading('正在修改');
  try {
    await updateNotice({
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
 * 删除公告
 * @param NoticeId
 */

const handleRemove = async (NoticeId: number | number[]) => {
  const hide = message.loading('正在删除');
  if (!NoticeId) return true;
  try {
    await delNotice(NoticeId);
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
  const [modalCurrent, setModalCurrent] = useState<NoticeListItem>({});
  const actionRef = useRef<ActionType>();
  const formRef = useRef<FormInstance>();
  const [selectedRowsState, setSelectedRows] = useState<number[]>([]);
  const { sys_normal_disable, sys_notice_type } = useDict({
    dictType: ['sys_normal_disable', 'sys_notice_type'],
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

  const handleDelModal = (NoticeIds: number | number[]) => {
    Modal.confirm({
      title: '系统提示',
      content: `是否确认删除公告编号为"${NoticeIds}"的数据项？`,
      onOk: async () => {
        const success = await handleRemove(NoticeIds);
        handleRefresh(success);
      },
    });
  };

  const columns: ProColumns<NoticeListItem>[] = [
    {
      title: '序号',
      dataIndex: 'noticeId',
      hideInSearch: true,
    },
    {
      title: '公告标题',
      dataIndex: 'noticeTitle',
      ellipsis: true,
    },
    {
      title: '公告类型',
      dataIndex: 'noticeType',
      valueEnum: sys_notice_type?.valueEnum,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: sys_normal_disable?.valueEnum,
      hideInSearch: true,
    },
    {
      title: '创建者',
      dataIndex: 'createBy',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInSearch: true,
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
            handleDelModal(record.noticeId as number);
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <BasicTable<NoticeListItem, API.PageParams>
        actionRef={actionRef}
        formRef={formRef}
        rowKey="noticeId"
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
            setSelectedRows(selectedRows.map((m) => m.noticeId) as number[]);
          },
          preserveSelectedRowKeys: true,
          selectedRowKeys: selectedRowsState,
        }}
      />
      <NoticeModal
        visible={modalVisible}
        current={modalCurrent}
        onSubmit={async (fields) => {
          const success = await (modalCurrent?.noticeId
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
