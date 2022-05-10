import type { FC } from 'react';
import {
  ModalForm,
  ProFormText,
  ProFormRadio,
  ProFormTextArea,
  ProFormDigit,
} from '@ant-design/pro-form';

import type { PostListItem } from '../data.d';
import { useEffect } from 'react';
import { Form } from 'antd';
import useDict from '@/hooks/useDict';

export type UserModalProps = {
  visible: boolean;
  current: Partial<PostListItem> | undefined;
  onSubmit: (values: PostListItem) => void;
  onCancel: () => void;
  type: string;
};

const titleMap = {
  edit: '修改岗位',
  add: '添加岗位',
};

const PostModal: FC<UserModalProps> = (props) => {
  const { visible, current, onSubmit, children, onCancel, type } = props;
  const [form] = Form.useForm();
  const { sys_normal_disable } = useDict({
    dictType: ['sys_user_sex', 'sys_normal_disable'],
  });

  /**
   * 初始化表单数据
   */
  const initFormData = async () => {
    if (visible) {
      form.setFieldsValue({ ...current });
    }
    if (!visible && form) {
      form.resetFields();
    }
  };

  useEffect(() => {
    initFormData();
  }, [visible]);
  return (
    <ModalForm<PostListItem>
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
        <ProFormText
          name="postName"
          label="岗位名称"
          placeholder="请输入岗位名称"
          rules={[{ required: true, message: '请输入岗位名称' }]}
        />
        <ProFormText
          name="postCode"
          label="岗位编码"
          placeholder="请输入岗位编码"
          rules={[{ required: true, message: '请输入岗位编码' }]}
        />
        <ProFormDigit
          label="岗位顺序"
          name="postSort"
          min={0}
          fieldProps={{ precision: 0 }}
          rules={[{ required: true, message: '请输入岗位顺序' }]}
        />
        <ProFormRadio.Group
          name="status"
          label="岗位状态"
          options={sys_normal_disable.options}
          rules={[{ required: true, message: '请输入岗位状态' }]}
        />
        <ProFormTextArea name="remark" label="备注" placeholder="请输入备注" />
      </>
    </ModalForm>
  );
};

export default PostModal;
