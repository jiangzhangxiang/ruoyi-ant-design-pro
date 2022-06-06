import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Modal } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import type { FormInstance } from 'antd';
import { list, addMenu, updateMenu, delMenu } from '@/services/system/menu';
import MenuModal from './components/MenuModal';
import type { MenuListItem } from './data.d';
import { BasicTable } from '@/components/Table';
import { connect } from 'umi';
import useDict from '@/hooks/useDict';
import { handleTree } from '@/utils';

/**
 * 添加菜单
 * @param fields
 */
const handleAdd = async (fields: MenuListItem) => {
  const hide = message.loading('正在新增');
  try {
    await addMenu({ ...fields });
    hide();
    message.success('新增成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 修改菜单
 * @param fields
 */
const handleUpdate = async (fields: any) => {
  const hide = message.loading('正在修改');
  try {
    await updateMenu({
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
 * 删除菜单
 * @param menuId
 */

const handleRemove = async (id: number | number[]) => {
  const hide = message.loading('正在删除');
  if (!id) return true;
  try {
    await delMenu(id);
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
  const [modalCurrent, setModalCurrent] = useState<MenuListItem>();
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
   * 刷新页面
   */
  const handleRefresh = (success: boolean) => {
    if (success && actionRef.current) {
      handleCancel();
      actionRef.current.reload();
    }
  };

  const handleDelModal = (ids: number | number[]) => {
    Modal.confirm({
      title: '系统提示',
      content: `是否确认删除菜单编号为"${ids}"的数据项？`,
      onOk: async () => {
        const success = await handleRemove(ids);
        handleRefresh(success);
      },
    });
  };

  const columns: ProColumns<MenuListItem>[] = [
    {
      title: '菜单名称',
      dataIndex: 'menuName',
    },
    {
      title: '排序',
      dataIndex: 'orderNum',
      hideInSearch: true,
    },
    {
      title: '权限标识',
      dataIndex: 'perms',
      hideInSearch: true,
    },
    {
      title: '组件路径',
      dataIndex: 'component',
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
        <a
          key="add"
          onClick={() => {
            setModalVisible(true);
            setModalCurrent(record);
            setModalType('add');
          }}
        >
          新增
        </a>,
        <div key="delete">
          <a
            onClick={() => {
              handleDelModal(record.menuId as number);
            }}
          >
            删除
          </a>
        </div>,
      ],
    },
  ];

  return (
    <PageContainer>
      <BasicTable<MenuListItem, API.PageParams>
        actionRef={actionRef}
        formRef={formRef}
        rowKey="menuId"
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
          list(params).then((res: any) => ({ data: handleTree(res.data, 'menuId') }))
        }
        columns={columns}
        expandable={{ defaultExpandAllRows: true }}
      />
      <MenuModal
        visible={modalVisible}
        current={modalCurrent}
        onSubmit={async (fields) => {
          const success = await (modalCurrent?.menuId
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
