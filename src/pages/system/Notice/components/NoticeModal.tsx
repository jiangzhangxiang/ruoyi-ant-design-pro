import type { FC } from 'react';
import { ModalForm, ProFormText, ProFormRadio, ProForm, ProFormSelect } from '@ant-design/pro-form';
import type { NoticeListItem } from '../data.d';
import { useEffect, useState } from 'react';
import { Form } from 'antd';
import useDict from '@/hooks/useDict';
import { getNotice } from '@/services/system/notice';
import Tinymce from '@/components/Tinymce';

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
  const [infoData, setInfoData] = useState<any>('');
  const [form] = Form.useForm();
  const { sys_normal_disable, sys_notice_type } = useDict({
    dictType: ['sys_normal_disable', 'sys_notice_type'],
  });
  /**
   * 初始化表单数据
   */
  const initData = async () => {
    if (visible && type === 'edit') {
      const { data } = await getNotice(current?.noticeId);
      setInfoData(data.noticeContent);
      form.setFieldsValue({ ...data });
    }
    if (!visible && form) {
      form.resetFields();
    }
  };

  useEffect(() => {
    initData();
  }, [visible]);
  return (
    <ModalForm<NoticeListItem>
      form={form}
      visible={visible}
      title={titleMap[type]}
      width={700}
      trigger={<>{children}</>}
      onFinish={async (values) => {
        onSubmit({ ...values, noticeContent: infoData });
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
        <Form.Item name="noticeContent" label="内容">
          <Tinymce onChangeValue={(e) => setInfoData(e)} />
        </Form.Item>
      </>
    </ModalForm>
  );
};

export default NoticeModal;
