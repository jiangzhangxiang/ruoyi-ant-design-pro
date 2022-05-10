import type { FC } from 'react';
import {
  ModalForm,
  ProFormText,
  ProForm,
  ProFormRadio,
  ProFormTreeSelect,
  ProFormDigit,
} from '@ant-design/pro-form';

import type { DeptListItem } from '../data.d';
import { getDept, listDeptExcludeChild, list } from '@/services/ant-design-pro/system/dept';
import { useEffect } from 'react';
import { Form } from 'antd';
import useDict from '@/hooks/useDict';
import { handleTree } from '@/utils';

export type UserModalProps = {
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

const DeptModal: FC<UserModalProps> = (props) => {
  const { visible, current, onSubmit, children, onCancel, type } = props;
  const [form] = Form.useForm();
  const { sys_normal_disable } = useDict({
    dictType: ['sys_normal_disable'],
  });
  const initTreeSelect = async () => {
    const call_back = async (sever: (params: any) => any, params?: number) => {
      const excludeChild = await sever(params);
      const treeData = handleTree(excludeChild.data, 'deptId');
      return treeData;
    };
    return type === 'add' ? call_back(list) : call_back(listDeptExcludeChild, current?.deptId);
  };
  /**
   * 初始化表单数据
   */
  const initFormData = async () => {
    if (visible) {
      if (type === 'edit') {
        const deptInfo = await getDept(current?.deptId);
        form.setFieldsValue({ ...deptInfo });
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
        <ProFormTreeSelect
          name="deptId"
          label="上级部门"
          allowClear
          placeholder="请选择上级部门"
          request={initTreeSelect}
          fieldProps={{
            fieldNames: { label: 'deptName', value: 'deptId', children: 'children' },
            treeDefaultExpandAll: true,
            allowClear: true,
            // treeData: deptIdTreeData
          }}
        />
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
            name="ancestors"
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
