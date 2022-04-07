import type { FC } from 'react';
import {
  ModalForm,
  ProFormSelect,
  ProFormText,
  ProForm,
  ProFormRadio,
  ProFormTextArea,
} from '@ant-design/pro-form';
import type { UserListItem } from '../data.d';

type UserModalProps = {
  visible: boolean;
  current: Partial<UserListItem> | undefined;
  onSubmit: (values: UserListItem) => void;
  onCancel: () => void;
  title: string;
};

const UserModal: FC<UserModalProps> = (props) => {
  const { visible, current, onSubmit, children, onCancel, title } = props;
  // if (!visible) {
  //   return null;
  // }
  return (
    <ModalForm<UserListItem>
      visible={visible}
      title={title}
      width={540}
      trigger={<>{children}</>}
      onFinish={async (values) => {
        onSubmit(values);
      }}
      initialValues={current}
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
          <ProFormSelect
            width="sm"
            name="deptId"
            label="归属部门"
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
            placeholder="请选择归属部门"
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
          <ProFormSelect
            width="sm"
            name="sex"
            label="用户性别"
            options={[
              {
                label: '男',
                value: '0',
              },
              {
                label: '女',
                value: '1',
              },
              {
                label: '未知',
                value: '2',
              },
            ]}
            placeholder="请选择用户性别"
          />
          <ProFormRadio.Group
            width="sm"
            name="status"
            label="状态"
            options={[
              {
                label: '停用',
                value: '0',
              },
              {
                label: '正常',
                value: '1',
              },
            ]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormSelect
            width="sm"
            name="postIds"
            label="岗位"
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
            placeholder="请选择岗位"
          />
          <ProFormSelect
            width="sm"
            name="roleIds"
            label="角色"
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
            placeholder="请选择角色"
          />
        </ProForm.Group>
        <ProFormTextArea name="remark" label="备注" placeholder="请输入备注" />
      </>
    </ModalForm>
  );
};

export default UserModal;
