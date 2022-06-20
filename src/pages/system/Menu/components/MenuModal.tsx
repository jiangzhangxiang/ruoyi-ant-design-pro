import type { FC } from 'react';
import {
  ModalForm,
  ProFormSelect,
  ProFormText,
  ProForm,
  ProFormRadio,
  ProFormTextArea,
} from '@ant-design/pro-form';

import type { MenuListItem } from '../data.d';

import { useEffect } from 'react';
import { Form } from 'antd';
import useDict from '@/hooks/useDict';

export type MenuModalProps = {
  visible: boolean;
  current: Partial<MenuListItem> | undefined;
  onSubmit: (values: MenuListItem) => void;
  onCancel: () => void;
  type: string;
};

const titleMap = {
  edit: '修改菜单',
  add: '新增菜单',
};

const MenuModal: FC<MenuModalProps> = (props) => {
  const { visible, current, onSubmit, children, onCancel, type } = props;
  const [form] = Form.useForm();
  const { sys_Menu_sex, sys_normal_disable } = useDict({
    dictType: ['sys_Menu_sex', 'sys_normal_disable'],
  });

  /**
   * 初始化表单数据
   */
  const initData = async () => {
    if (visible) {
      form.setFieldsValue({ ...current });
    }
    if (!visible && current) {
      form.resetFields();
    }
  };

  useEffect(() => {
    initData();
  }, [visible]);
  return (
    <ModalForm<MenuListItem>
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
      }}
    >
      <>
        <ProForm.Group>
          <ProFormText
            width="sm"
            name="nickName"
            label="菜单昵称"
            rules={[{ required: true, message: '请输入菜单昵称' }]}
            placeholder="请输入菜单昵称"
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
        <ProForm.Group>
          <ProFormSelect
            width="sm"
            name="sex"
            label="菜单性别"
            options={sys_Menu_sex.options}
            placeholder="请选择菜单性别"
          />
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

export default MenuModal;
