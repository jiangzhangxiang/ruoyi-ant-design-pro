import type { FC } from 'react';
import { ModalForm } from '@ant-design/pro-form';
import type { OperlogListItem } from '../data.d';
import { useEffect } from 'react';
import { Form } from 'antd';

export type OperlogModalProps = {
  visible: boolean;
  current: Partial<OperlogListItem> | undefined;
  onSubmit?: (values: OperlogListItem) => void;
  onCancel?: () => void;
  type: string;
};

const titleMap = {
  details: '操作日志详细',
};

const OperlogModal: FC<OperlogModalProps> = (props) => {
  const { visible, current, onCancel, type } = props;
  const [form] = Form.useForm();

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
    <ModalForm<OperlogListItem>
      form={form}
      visible={visible}
      title={titleMap[type]}
      width={540}
      trigger={<></>}
      modalProps={{
        onCancel: onCancel,
        destroyOnClose: true,
        okText: false,
        cancelText: false,
      }}
    >
      <></>
    </ModalForm>
  );
};

export default OperlogModal;
