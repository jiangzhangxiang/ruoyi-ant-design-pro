import type { FC } from 'react';
import {
  ModalForm,
  ProFormText,
  ProForm,
  ProFormRadio,
  ProFormTextArea,
  ProFormTreeSelect,
} from '@ant-design/pro-form';

import type { ConfigListItem } from '../data.d';
import { useRequest } from '@@/plugin-request/request';
import { treeselect } from '@/services/ant-design-pro/system/dept';
import { getConfig } from '@/services/ant-design-pro/system/config';
import { useEffect } from 'react';
import { Form } from 'antd';
import useDict from '@/hooks/useDict';

export type UserModalProps = {
  visible: boolean;
  current: Partial<ConfigListItem> | undefined;
  onSubmit: (values: ConfigListItem) => void;
  onCancel: () => void;
  type: string;
};

const titleMap = {
  edit: '修改用户',
  add: '添加用户',
};

const ConfigModal: FC<UserModalProps> = (props) => {
  const { visible, current, onSubmit, children, onCancel, type } = props;
  const { data: deptIdTreeData }: any = useRequest(treeselect);
  const [form] = Form.useForm();
  const { sys_normal_disable } = useDict({
    dictType: ['sys_normal_disable'],
  });

  /**
   * 初始化表单数据
   */
  const initFormData = async () => {
    if (visible) {
      const { data } = await getConfig(current?.userId);
      form.setFieldsValue({ ...data });
    }
    if (!visible && form) {
      form.resetFields();
    }
  };

  useEffect(() => {
    initFormData();
  }, [visible]);
  return (
    <ModalForm<ConfigListItem>
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
        <ProForm.Group>
          <ProFormText
            width="sm"
            name="nickName"
            label="用户昵称"
            rules={[{ required: true, message: '请输入用户昵称' }]}
            placeholder="请输入用户昵称"
          />
          <ProFormTreeSelect
            width="sm"
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
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            width="sm"
            name="phonenumber"
            label="手机号码"
            placeholder="请输入手机号码"
          />
          <ProFormText width="sm" name="email" label="邮箱" placeholder="请输入邮箱" />
        </ProForm.Group>
        {!current?.userId && (
          <ProForm.Group>
            <ProFormText
              width="sm"
              name="userName"
              label="用户名称"
              rules={[{ required: true, message: '请输入用户名称' }]}
              placeholder="请输入用户名称"
            />
            <ProFormText
              width="sm"
              name="password"
              label="用户密码"
              rules={[{ required: true, message: '请输入用户密码' }]}
              placeholder="请输入用户密码"
            />
          </ProForm.Group>
        )}
        <ProForm.Group>
          <ProFormRadio.Group
            width="sm"
            name="status"
            label="状态"
            options={sys_normal_disable.options}
          />
        </ProForm.Group>
        <ProFormTextArea name="remark" label="备注" placeholder="请输入备注" />
      </>
    </ModalForm>
  );
};

export default ConfigModal;
