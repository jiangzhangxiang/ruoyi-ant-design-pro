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
import { useRequest } from '@@/plugin-request/request';
import { getDept, treeselect } from '@/services/ant-design-pro/system/dept';
import { useEffect } from 'react';
import { Form } from 'antd';
import { configKey } from '@/services/ant-design-pro/system/config';
import useDict from '@/hooks/useDict';

export type UserModalProps = {
  visible: boolean;
  current: Partial<DeptListItem> | undefined;
  onSubmit: (values: DeptListItem) => void;
  onCancel: () => void;
  type: string;
};

let initPassword = '';

const titleMap = {
  edit: '修改部门',
  add: '添加部门',
};

const DeptModal: FC<UserModalProps> = (props) => {
  const { visible, current, onSubmit, children, onCancel, type } = props;
  const { data: deptIdTreeData }: any = useRequest(treeselect);
  const [form] = Form.useForm();
  const { sys_normal_disable } = useDict({
    dictType: ['sys_normal_disable'],
  });
  /**
   * 查询参数值
   */
  useEffect(() => {
    configKey('sys.user.initPassword').then((res) => {
      initPassword = res.msg;
    });
  }, []);

  /**
   * 初始化表单数据
   */
  const initFormData = async () => {
    if (visible) {
      const userInfo = await getDept(current?.deptId);
      form.setFieldsValue({ ...current, roleIds: userInfo.roleIds, postIds: userInfo.postIds });
    }
    if (type === 'add' && form) {
      form.setFieldsValue({ password: initPassword });
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
          label="归属部门"
          allowClear
          placeholder="请选择归属部门"
          request={() => deptIdTreeData}
          fieldProps={{
            fieldNames: { label: 'label', value: 'id', children: 'children' },
            treeDefaultExpandAll: true,
            allowClear: true,
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
