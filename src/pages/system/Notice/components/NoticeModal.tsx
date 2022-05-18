import type { FC } from 'react';
import {
  ModalForm,
  ProFormText,
  ProFormRadio,
  ProFormTextArea,
  ProForm,
  ProFormSelect,
} from '@ant-design/pro-form';

import type { NoticeListItem } from '../data.d';
import { useEffect } from 'react';
import { Form } from 'antd';
import useDict from '@/hooks/useDict';
import { getNotice } from '@/services/ant-design-pro/system/notice';

export type UserModalProps = {
  visible: boolean;
  current: Partial<NoticeListItem> | undefined;
  onSubmit: (values: NoticeListItem) => void;
  onCancel: () => void;
  type: string;
};

const titleMap = {
  edit: '修改公告',
  add: '新增公告',
};

const NoticeModal: FC<UserModalProps> = (props) => {
  const { visible, current, onSubmit, children, onCancel, type } = props;
  const [form] = Form.useForm();
  const { sys_normal_disable, sys_notice_type } = useDict({
    dictType: ['sys_normal_disable', 'sys_notice_type'],
  });
  /**
   * 初始化表单数据
   */
  const initFormData = async () => {
    if (visible && type === 'edit') {
      const { data } = await getNotice(current?.noticeId);
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
    <ModalForm<NoticeListItem>
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
          name="noticeTitle"
          label="公告标题"
          placeholder="请输入公告标题"
          rules={[{ required: true, message: '请输入公告标题' }]}
        />
        <ProForm.Group>
          <ProFormSelect
            width="sm"
            name="noticeType"
            label="公告类型"
            options={sys_notice_type.options}
            rules={[{ required: true, message: '请输入公告类型' }]}
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

export default NoticeModal;
