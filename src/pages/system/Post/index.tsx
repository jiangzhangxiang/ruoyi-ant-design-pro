import { PlusOutlined, DeleteOutlined, DownloadOutlined } from '@ant-design/icons';
import { Button, message, Modal } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import type { FormInstance } from 'antd';
import { list, addpost, updatePost, delPost } from '@/services/system/post';
import PostModal from './components/PostModal';
import type { PostListItem } from './data.d';
import { download } from '@/services/api';
import { BasicTable } from '@/components/Table';
import { connect } from 'umi';
import useDict from '@/hooks/useDict';

/**
 * 添加用户
 * @param fields
 */
const handleAdd = async (fields: PostListItem) => {
  const hide = message.loading('正在新增');
  try {
    await addpost({ ...fields });
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
    await updatePost({
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
 * 删除岗位
 * @param postId
 */
const handleRemove = async (postId: number | number[]) => {
  const hide = message.loading('正在删除');
  if (!postId) return true;
  try {
    await delPost(postId);
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
  const [modalCurrent, setModalCurrent] = useState<PostListItem>();
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

  const columns: ProColumns<PostListItem>[] = [
    {
      title: '岗位编号',
      dataIndex: 'postId',
      hideInSearch: true,
    },
    {
      title: '岗位编码',
      dataIndex: 'postCode',
    },
    {
      title: '岗位名称',
      dataIndex: 'postName',
    },
    {
      title: '岗位顺序',
      dataIndex: 'postSort',
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: sys_normal_disable?.valueEnum,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateRange',
      render: (_, record) => record.createTime,
      hideInSearch: true,
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
          key="delete"
          onClick={() => {
            handleDelModal(record.postId as number);
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <BasicTable<PostListItem, API.PageParams>
        actionRef={actionRef}
        formRef={formRef}
        rowKey="postId"
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
            key="delete"
            onClick={() => {
              handleDelModal(selectedRowsState as number[]);
            }}
          >
            <DeleteOutlined /> 删除
          </Button>,
          <Button
            type="primary"
            key="export"
            onClick={() => {
              const params = formRef.current?.getFieldsValue();
              download('/system/post/export', params, `post_${new Date().getTime()}.xlsx`);
            }}
          >
            <DownloadOutlined /> 导出
          </Button>,
        ]}
        request={list}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows.map((m) => m.postId) as number[]);
          },
          preserveSelectedRowKeys: true,
          selectedRowKeys: selectedRowsState,
        }}
      />
      <PostModal
        visible={modalVisible}
        current={modalCurrent}
        onSubmit={async (fields) => {
          const success = await (modalCurrent?.postId
            ? handleUpdate({ ...modalCurrent, ...fields })
            : handleAdd({ ...modalCurrent, ...fields }));
          handleRefresh(success);
        }}
        onCancel={handleCancel}
        type={modalType}
      />
    </PageContainer>
  );
};

export default connect()(TableList);
