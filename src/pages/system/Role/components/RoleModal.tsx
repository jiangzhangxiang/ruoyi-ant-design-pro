import type { FC } from 'react';
import {
  ModalForm,
  ProFormText,
  ProForm,
  ProFormRadio,
  ProFormDigit,
  ProFormTextArea,
} from '@ant-design/pro-form';
import type { RoleListItem } from '../data.d';
import { useEffect } from 'react';
import { Form } from 'antd';
import useDict from '@/hooks/useDict';
import { getRole } from '@/services/system/role';
import { roleMenuTreeselect, treeselect } from '@/services/system/menu';

export type RoleModalProps = {
  visible: boolean;
  current: Partial<RoleListItem> | undefined;
  onSubmit: (values: RoleListItem) => void;
  onCancel: () => void;
  type: string;
};

const titleMap = {
  edit: '修改角色',
  add: '新增角色',
};

const RoleModal: FC<RoleModalProps> = (props) => {
  const { visible, current, onSubmit, children, onCancel, type } = props;
  const [form] = Form.useForm();
  const { sys_normal_disable } = useDict({
    dictType: ['sys_normal_disable'],
  });
  /**
   * 初始化表单数据
   */
  const initData = async () => {
    if (visible) {
      if (current?.roleId) {
        const { data } = await getRole(current?.roleId);
        form.setFieldsValue({ ...data });
      }
      const roleMenu = current?.roleId
        ? await roleMenuTreeselect(current?.roleId)
        : await treeselect();
      console.log(roleMenu);
    }
    if (!visible && current) {
      form.resetFields();
    }
  };

  useEffect(() => {
    initData();
  }, [visible]);
  return (
    <ModalForm<RoleListItem>
      form={form}
      visible={visible}
      title={titleMap[type]}
      width={540}
      trigger={<>{children}</>}
      onFinish={async (values) => {
        onSubmit({ menuIds: [], ...values });
      }}
      modalProps={{
        onCancel: onCancel,
      }}
    >
      <>
        <ProForm.Group>
          <ProFormText
            width="sm"
            name="roleName"
            label="角色名称"
            rules={[{ required: true, message: '请输入角色名称' }]}
            placeholder="请输入角色昵称"
          />
          <ProFormText
            width="sm"
            name="roleKey"
            label="权限字符"
            rules={[{ required: true, message: '请输入权限字符' }]}
            placeholder="请输入权限字符"
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormDigit
            width="sm"
            label="显示排序"
            name="roleSort"
            min={0}
            fieldProps={{ precision: 0 }}
            rules={[{ required: true, message: '请输入显示排序' }]}
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

export default RoleModal;
