import type { FC } from 'react';
import {
  ModalForm,
  ProFormSelect,
  ProFormText,
  ProForm,
  ProFormRadio,
  ProFormTextArea,
} from '@ant-design/pro-form';
import type { UserListItemDataType } from '../data.d';

type UserModalProps = {
  visible: boolean;
  current: Partial<UserListItemDataType> | undefined;
  onSubmit: (values: UserListItemDataType) => void;
};

const UserModal: FC<UserModalProps> = (props) => {
  const { visible, current, onSubmit, children } = props;
  if (!visible) {
    return null;
  }
  return (
    <ModalForm<UserListItemDataType>
      visible={visible}
      title={`用户${current ? '编辑' : '添加'}`}
      width={540}
      trigger={<>{children}</>}
      onFinish={async (values) => {
        onSubmit(values);
      }}
      initialValues={current}
      modalProps={{
        destroyOnClose: true,
      }}
    >
      <>
        <ProForm.Group>
          <ProFormText
            width="sm"
            name="title"
            label="用户昵称"
            rules={[{ required: true, message: '请输入用户昵称' }]}
            placeholder="请输入用户昵称"
          />
          <ProFormSelect
            width="sm"
            name="owner"
            label="归属部门"
            rules={[{ required: true, message: '请选择任务负责人' }]}
            options={[
              {
                label: '付晓晓',
                value: 'xiao',
              },
              {
                label: '周毛毛',
                value: 'mao',
              },
            ]}
            placeholder="请选择管理员"
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            width="sm"
            name="title"
            label="手机号码"
            rules={[{ required: true, message: '请输入用户昵称' }]}
            placeholder="请输入用户昵称"
          />
          <ProFormText
            width="sm"
            name="title"
            label="邮箱"
            rules={[{ required: true, message: '请输入用户昵称' }]}
            placeholder="请输入用户昵称"
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            width="sm"
            name="title"
            label="用户名称"
            rules={[{ required: true, message: '请输入用户昵称' }]}
            placeholder="请输入用户昵称"
          />
          <ProFormText
            width="sm"
            name="title"
            label="密码"
            rules={[{ required: true, message: '请输入用户昵称' }]}
            placeholder="请输入用户昵称"
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormSelect
            width="sm"
            name="owner"
            label="用户性别"
            rules={[{ required: true, message: '请选择任务负责人' }]}
            options={[
              {
                label: '男',
                value: 'xiao',
              },
              {
                label: '女',
                value: 'mao',
              },
              {
                label: '未知',
                value: 'mao',
              },
            ]}
            placeholder="请选择管理员"
          />
          <ProFormRadio.Group
            width="sm"
            name="radio"
            label="状态"
            options={[
              {
                label: '停用',
                value: 'a',
              },
              {
                label: '正常',
                value: 'b',
              },
            ]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormSelect
            width="sm"
            name="owner"
            label="岗位"
            rules={[{ required: true, message: '请选择任务负责人' }]}
            options={[
              {
                label: '男',
                value: 'xiao',
              },
              {
                label: '女',
                value: 'mao',
              },
              {
                label: '未知',
                value: 'mao',
              },
            ]}
            placeholder="请选择管理员"
          />
          <ProFormSelect
            width="sm"
            name="owner"
            label="角色"
            rules={[{ required: true, message: '请选择任务负责人' }]}
            options={[
              {
                label: '男',
                value: 'xiao',
              },
              {
                label: '女',
                value: 'mao',
              },
              {
                label: '未知',
                value: 'mao',
              },
            ]}
            placeholder="请选择管理员"
          />
        </ProForm.Group>
        <ProFormTextArea name="subDescription" label="备注" placeholder="请输入备注" />
      </>
    </ModalForm>
  );
};

export default UserModal;
