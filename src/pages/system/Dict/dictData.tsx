import {
  PlusOutlined,
  DeleteOutlined,
  DownloadOutlined,
  RollbackOutlined,
} from '@ant-design/icons';
import { Button, message, Modal } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import type { FormInstance } from 'antd';
import { listData, addDictData, updateDictData, delDictData } from '@/services/system/dict/data';
import { list as listType } from '@/services/system/dict/type';

import DictDataModal from './components/DictDataModal';
import type { DictDataListItem } from './data.d';
import { download } from '@/services/api';
import { BasicTable } from '@/components/Table';
import { connect, history } from 'umi';
import { addDateRange } from '@/utils';
import { dictTransform } from '@/hooks/useDict';

/**
 * 添加字典数据
 * @param fields
 */
const handleUserAdd = async (fields: DictDataListItem) => {
  const hide = message.loading('正在新增');
  try {
    await addDictData({ ...fields });
    hide();
    message.success('新增成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 修改字典数据
 * @param fields
 */
const handleUpdate = async (fields: any) => {
  const hide = message.loading('正在修改');
  try {
    await updateDictData({
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
 * 删除字典数据
 * @param id
 */

const handleRemove = async (id: number | number[]) => {
  const hide = message.loading('正在删除');
  if (!id) return true;
  try {
    await delDictData(id);
    hide();
    message.success('删除成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

const TableList: React.FC = (props: any) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>('');
  const [modalCurrent, setModalCurrent] = useState<DictDataListItem>({});
  const actionRef = useRef<ActionType>();
  const formRef = useRef<FormInstance>();
  const [selectedRowsState, setSelectedRows] = useState<number[]>([]);
  const [dictTypeValueEnum, setDictTypeValueEnum] = useState({});
  const [dictType, setDictType] = useState('');

  /**
   * 初始化 dictType
   */
  const initData = () => {
    listType().then((res) => {
      const { valueEnum } = dictTransform(res.rows, 'dictType', 'dictName');
      setDictTypeValueEnum(valueEnum);
    });
  };

  useEffect(() => {
    initData();
  }, []);

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
      content: `是否确认删除字典数据编号为"${userIds}"的数据项？`,
      onOk: async () => {
        const success = await handleRemove(userIds);
        handleRefresh(success);
      },
    });
  };

  const columns: ProColumns<DictDataListItem>[] = [
    {
      title: '字典名称',
      dataIndex: 'dictType',
      hideInTable: true,
      valueEnum: dictTypeValueEnum,
      initialValue: props.location.query.dictType,
    },
    {
      title: '字典编号',
      dataIndex: 'dictCode',
      hideInSearch: true,
    },
    {
      title: '字典标签',
      dataIndex: 'dictLabel',
    },
    {
      title: '字典键值',
      dataIndex: 'dictValue',
    },
    {
      title: '字典排序',
      dataIndex: 'dictSort',
    },
    {
      title: '备注',
      dataIndex: 'remark',
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
            setDictType(formRef.current?.getFieldsValue().dictType);
          }}
        >
          修改
        </a>,
        <a
          key="delete"
          onClick={() => {
            handleDelModal(record.dictCode as number);
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <BasicTable<DictDataListItem, API.PageParams>
        actionRef={actionRef}
        formRef={formRef}
        rowKey="dictCode"
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
              setDictType(formRef.current?.getFieldsValue().dictType);
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
            key="down"
            onClick={() => {
              const params = formRef.current?.getFieldsValue();
              download('/system/dict/data/export', params, `data_${new Date().getTime()}.xlsx`);
            }}
          >
            <DownloadOutlined /> 导出
          </Button>,
          <Button
            key="close"
            onClick={() => {
              history.goBack();
            }}
          >
            <RollbackOutlined /> 关闭
          </Button>,
        ]}
        request={listData}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows.map((m) => m.dictCode) as number[]);
          },
          preserveSelectedRowKeys: true,
          selectedRowKeys: selectedRowsState,
        }}
      />
      <DictDataModal
        dictType={dictType}
        visible={modalVisible}
        current={modalCurrent}
        onSubmit={async (fields) => {
          const success = await (modalCurrent?.dictCode
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
