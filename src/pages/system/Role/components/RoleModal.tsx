import type { FC } from 'react';
import {
  ModalForm,
  ProFormSelect,
  ProFormText,
  ProForm,
  ProFormRadio,
  ProFormTextArea,
  ProFormTreeSelect,
} from '@ant-design/pro-form';

import type { RoleListItem } from '../data.d';
import { useRequest } from '@@/plugin-request/request';
import { treeselect } from '@/services/ant-design-pro/system/dept';
import { getUser } from '@/services/ant-design-pro/system/user';
import { useEffect, useState } from 'react';
import { Form } from 'antd';
import { configKey } from '@/services/ant-design-pro/system/config';
import useDict from '@/hooks/useDict';

export type UserModalProps = {
  visible: boolean;
  current: Partial<RoleListItem> | undefined;
  onSubmit: (values: RoleListItem) => void;
  onCancel: () => void;
  type: string;
};

let initPassword = '';

const titleMap = {
  edit: '修改用户',
  add: '添加用户',
};

const RoleModal: FC<UserModalProps> = (props) => {
  const { visible, current, onSubmit, children, onCancel, type } = props;
  const { data: deptIdTreeData }: any = useRequest(treeselect);
  const [userData, setUserData] = useState<{ posts: any[]; roles: any[] } | any>();
  const [form] = Form.useForm();
  const { sys_user_sex, sys_normal_disable } = useDict({
    dictType: ['sys_user_sex', 'sys_normal_disable'],
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
      const userInfo = await getUser(current?.roleId);
      userInfo.posts = userInfo.posts.map((p: any) => ({ value: p.postId, label: p.postName }));
      userInfo.roles = userInfo.roles.map((r: any) => ({ value: r.roleId, label: r.roleName }));
      setUserData(userInfo);
      form.setFieldsValue({ ...current, roleIds: userInfo.roleIds, postIds: userInfo.postIds });
    }
    if (type === 'add') {
      form.setFieldsValue({ password: initPassword });
    }
    if (!visible) {
      form.resetFields();
    }
  };

  useEffect(() => {
    initFormData();
  }, [visible]);
  return (
    <ModalForm<RoleListItem>
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
        {!current?.roleId && (
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
            options={sys_user_sex.options}
            placeholder="请选择用户性别"
          />
          <ProFormRadio.Group
            width="sm"
            name="status"
            label="状态"
            options={sys_normal_disable.options}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormSelect
            width="sm"
            mode="multiple"
            name="postIds"
            label="岗位"
            options={userData?.posts}
            placeholder="请选择岗位"
          />
          <ProFormSelect
            width="sm"
            mode="multiple"
            name="roleIds"
            label="角色"
            options={userData?.roles}
            placeholder="请选择角色"
          />
        </ProForm.Group>
        <ProFormTextArea name="remark" label="备注" placeholder="请输入备注" />
      </>
    </ModalForm>
  );
};

export default RoleModal;
