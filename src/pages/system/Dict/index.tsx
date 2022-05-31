import { PlusOutlined, DeleteOutlined, DownloadOutlined, RetweetOutlined } from '@ant-design/icons';
import { Button, message, Modal } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import type { FormInstance } from 'antd';
import { list, addDict, updateDict, delDict, refreshCache } from '@/services/system/dict/type';
import DictModal from './components/DictModal';
import type { DictListItem } from './data.d';
import { download } from '@/services/api';
import { BasicTable } from '@/components/Table';
import { connect } from 'umi';
import useDict from '@/hooks/useDict';
import { addDateRange } from '@/utils';
import { history } from '@@/core/history';

/**
 * 添加字典
 * @param fields
 */
const handleUserAdd = async (fields: DictListItem) => {
  const hide = message.loading('正在新增');
  try {
    await addDict({ ...fields });
    hide();
    message.success('新增成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 修改字典
 * @param fields
 */
const handleUpdate = async (fields: any) => {
  const hide = message.loading('正在修改');
  try {
    await updateDict({
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
 * 删除字典
 * @param dictId
 */

const handleRemove = async (id: number | number[]) => {
  const hide = message.loading('正在删除');
  if (!id) return true;
  try {
    await delDict(id);
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
  const [modalCurrent, setModalCurrent] = useState<DictListItem>({});
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
      content: `是否确认删除字典编号为"${userIds}"的数据项？`,
      onOk: async () => {
        const success = await handleRemove(userIds);
        handleRefresh(success);
      },
    });
  };
  const columns: ProColumns<DictListItem>[] = [
    {
      title: '字典编号',
      dataIndex: 'dictId',
      hideInSearch: true,
    },
    {
      title: '字典名称',
      dataIndex: 'dictName',
    },
    {
      title: '字典类型',
      dataIndex: 'dictType',
      render: (text, record) => {
        return (
          <a
            key="edit"
            onClick={() => {
              if (record.dictType) {
                history.push({
                  pathname: '/system/dict-data/',
                  query: { dictType: record.dictType },
                });
              }
            }}
          >
            {text}
          </a>
        );
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: sys_normal_disable?.valueEnum,
    },
    {
      title: '备注',
      dataIndex: 'remark',
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
          key="delete"
          onClick={() => {
            handleDelModal(record.dictId as number);
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <BasicTable<DictListItem, API.PageParams>
        actionRef={actionRef}
        formRef={formRef}
        rowKey="dictId"
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
              download('/system/dict/type/export', params, `type_${new Date().getTime()}.xlsx`);
            }}
          >
            <DownloadOutlined /> 导出
          </Button>,
          <Button
            danger
            key="retweet"
            onClick={() => {
              refreshCache().then(() => {
                message.success('刷新成功');
              });
            }}
          >
            <RetweetOutlined /> 刷新缓存
          </Button>,
        ]}
        request={list}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows.map((m) => m.dictId) as number[]);
          },
          preserveSelectedRowKeys: true,
          selectedRowKeys: selectedRowsState,
        }}
      />
      <DictModal
        visible={modalVisible}
        current={modalCurrent}
        onSubmit={async (fields) => {
          const success = await (modalCurrent?.dictId
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
