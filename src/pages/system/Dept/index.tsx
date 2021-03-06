import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Modal } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import type { FormInstance } from 'antd';
import { list, addDept, updateDept, delDept } from '@/services/system/dept';
import DeptModal from './components/DeptModal';
import type { DeptListItem } from './data.d';
import { BasicTable } from '@/components/Table';
import { connect } from 'umi';
import useDict from '@/hooks/useDict';
import { handleTree } from '@/utils';

/**
 * 添加部门
 * @param fields
 */
const handleAdd = async (fields: DeptListItem) => {
  const hide = message.loading('正在新增');
  try {
    await addDept({ ...fields });
    hide();
    message.success('新增成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 修改部门
 * @param fields
 */
const handleUpdate = async (fields: any) => {
  const hide = message.loading('正在修改');
  try {
    await updateDept({
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
 * 删除部门
 * @param deptId
 */
const handleRemove = async (deptId: number | number[]) => {
  const hide = message.loading('正在删除');
  if (!deptId) return true;
  try {
    await delDept(deptId);
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
  const [modalCurrent, setModalCurrent] = useState<DeptListItem>();
  const actionRef = useRef<ActionType>();
  const formRef = useRef<FormInstance>();

  /**
   * 取消
   */
  const handleCancel = () => {
    setModalVisible(false);
    setModalType('');
    setModalCurrent({});
  };

  /**
   * 刷新
   */
  const handleRefresh = (success: boolean) => {
    if (success && actionRef.current) {
      handleCancel();
      actionRef.current.reload();
    }
  };

  /**
   * 删除
   */
  const handleDelModal = (ids: number | number[]) => {
    Modal.confirm({
      title: '系统提示',
      content: `是否确认删除部门编号为"${ids}"的数据项？`,
      onOk: async () => {
        const success = await handleRemove(ids);
        handleRefresh(success);
      },
    });
  };

  const columns: ProColumns<DeptListItem>[] = [
    {
      title: '部门名称',
      dataIndex: 'deptName',
    },
    {
      title: '排序',
      dataIndex: 'orderNum',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: sys_normal_disable?.valueEnum,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
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
        <div key="delete">
          {record.parentId !== 0 && (
            <a
              onClick={() => {
                handleDelModal(record.deptId as number);
              }}
            >
              删除
            </a>
          )}
        </div>,
      ],
    },
  ];

  return (
    <PageContainer>
      <BasicTable<DeptListItem, API.PageParams>
        actionRef={actionRef}
        formRef={formRef}
        rowKey="deptId"
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
        ]}
        request={async (params: any) =>
          list(params).then((res: any) => ({ data: handleTree(res.data, 'deptId') }))
        }
        columns={columns}
        expandable={{ defaultExpandAllRows: true }}
      />
      <DeptModal
        visible={modalVisible}
        current={modalCurrent}
        onSubmit={async (fields) => {
          const success = await (modalCurrent?.deptId
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
