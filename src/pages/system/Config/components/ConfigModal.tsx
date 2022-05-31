import type { FC } from 'react';
import { ModalForm, ProFormText, ProFormRadio, ProFormTextArea } from '@ant-design/pro-form';

import type { ConfigListItem } from '../data.d';
import { useEffect } from 'react';
import { Form } from 'antd';
import useDict from '@/hooks/useDict';
import { getConfig } from '@/services/system/config';

export type UserModalProps = {
  visible: boolean;
  current: Partial<ConfigListItem> | undefined;
  onSubmit: (values: ConfigListItem) => void;
  onCancel: () => void;
  type: string;
};

const titleMap = {
  edit: '修改参数',
  add: '新增参数',
};

const ConfigModal: FC<UserModalProps> = (props) => {
  const { visible, current, onSubmit, children, onCancel, type } = props;
  const [form] = Form.useForm();
  const { sys_yes_no } = useDict({
    dictType: ['sys_yes_no'],
  });

  /**
   * 初始化表单数据
   */
  const initFormData = async () => {
    if (visible && type === 'edit') {
      const { data } = await getConfig(current?.configId);
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
        <ProFormText
          name="configName"
          label="参数名称"
          placeholder="请输入参数名称"
          rules={[{ required: true, message: '请输入参数名称' }]}
        />
        <ProFormText
          name="configKey"
          label="参数键名"
          placeholder="请输入参数键名"
          rules={[{ required: true, message: '请输入参数键名' }]}
        />
        <ProFormText
          name="configValue"
          label="参数键值"
          placeholder="请输入参数键值"
          rules={[{ required: true, message: '请输入参数键值' }]}
        />
        <ProFormRadio.Group name="configType" label="系统内置" options={sys_yes_no.options} />
        <ProFormTextArea name="remark" label="备注" placeholder="请输入备注" />
      </>
    </ModalForm>
  );
};

export default ConfigModal;
