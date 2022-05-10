import type { FC } from 'react';
import { useEffect, useState } from 'react';
import {
  ModalForm,
  ProForm,
  ProFormDigit,
  ProFormRadio,
  ProFormText,
  ProFormTreeSelect,
} from '@ant-design/pro-form';

import type { DeptListItem } from '../data.d';
import { getDept, list, listDeptExcludeChild } from '@/services/ant-design-pro/system/dept';
import { Form } from 'antd';
import useDict from '@/hooks/useDict';
import { handleTree } from '@/utils';

export type DeptModalProps = {
  visible: boolean;
  current: Partial<DeptListItem> | undefined;
  onSubmit: (values: DeptListItem) => void;
  onCancel: () => void;
  type: string;
};

const titleMap = {
  edit: '修改部门',
  add: '添加部门',
};

const DeptModal: FC<DeptModalProps> = (props) => {
  const { visible, current, onSubmit, children, onCancel, type } = props;
  const [formData, setFormData] = useState<DeptListItem>({
    parentId: undefined,
  });
  const [form] = Form.useForm();
  const { sys_normal_disable } = useDict({
    dictType: ['sys_normal_disable'],
  });

  /**
   * 初始化 上级部门选择
   */
  const initTreeSelect = async () => {
    if (!visible) return [];
    const call_back = async (sever: (params: any) => any, params?: number) => {
      const excludeChild = await sever(params);
      console.log(handleTree(excludeChild.data, 'deptId'));
      return handleTree(excludeChild.data, 'deptId');
    };
    return type === 'add' ? call_back(list) : call_back(listDeptExcludeChild, current?.deptId);
  };

  /**
   * 初始化表单数据
   */
  const initFormData = async () => {
    if (visible) {
      if (type === 'edit') {
        const { data } = await getDept(current?.deptId);
        setFormData(data);
        form.setFieldsValue({ ...data });
      }
    }
    if (!visible && form) {
      form.resetFields();
    }
  };
  useEffect(() => {
    initFormData();
  }, [visible]);
  return (
    <ModalForm<DeptListItem>
      form={form}
      visible={visible}
      title={titleMap[type]}
      width={540}
      trigger={<>{children}</>}
      onFinish={async (values) => {
        onSubmit(values);
      }}
      modalProps={{
        onCancel: onCancel,
        destroyOnClose: true,
      }}
    >
      <>
        {formData?.parentId !== 0 && (
          <ProFormTreeSelect
            name="parentId"
            label="上级部门"
            allowClear
            placeholder="请选择上级部门"
            request={initTreeSelect}
            rules={[{ required: true, message: '请选择上级部门' }]}
            fieldProps={{
              fieldNames: { label: 'deptName', value: 'deptId', children: 'children' },
              treeDefaultExpandAll: true,
              allowClear: true,
            }}
          />
        )}
        <ProForm.Group>
          <ProFormText
            width="sm"
            name="deptName"
            label="部门名称"
            rules={[{ required: true, message: '请输入部门名称' }]}
            placeholder="请输入部门昵称"
          />
          <ProFormDigit
            width="sm"
            label="显示排序"
            name="orderNum"
            min={0}
            fieldProps={{ precision: 0 }}
            rules={[{ required: true, message: '请输入显示排序' }]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText width="sm" name="leader" label="负责人" placeholder="请输入部门负责人" />
          <ProFormText width="sm" name="phone" label="手机号码" placeholder="请输入手机号码" />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText width="sm" name="email" label="邮箱" placeholder="请输入邮箱" />
          <ProFormRadio.Group
            width="sm"
            name="status"
            label="状态"
            options={sys_normal_disable.options}
          />
        </ProForm.Group>
      </>
    </ModalForm>
  );
};

export default DeptModal;
