import type { FC } from 'react';
import {
  ModalForm,
  ProFormText,
  ProFormRadio,
  ProFormTextArea,
  ProFormDigit,
} from '@ant-design/pro-form';
import type { DictDataListItem } from '../data.d';
import { useEffect } from 'react';
import { Form } from 'antd';
import useDict from '@/hooks/useDict';

export type DictDataModalProps = {
  visible: boolean;
  current: Partial<DictDataListItem> | undefined;
  onSubmit: (values: DictDataListItem) => void;
  onCancel: () => void;
  type: string;
  dictType: string;
};

const titleMap = {
  edit: '修改字典数据',
  add: '新增字典数据',
};

const DictModal: FC<DictDataModalProps> = (props) => {
  const { visible, current, onSubmit, children, onCancel, type, dictType } = props;
  const [form] = Form.useForm();
  const { sys_normal_disable } = useDict({
    dictType: ['sys_normal_disable'],
  });

  /**
   * 初始化表单数据
   */
  const initData = async () => {
    if (visible) {
      form?.setFieldsValue({ ...current, dictType });
    }
    if (!visible && current) {
      form.resetFields();
    }
  };

  useEffect(() => {
    initData();
  }, [visible]);
  return (
    <ModalForm<DictDataListItem>
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
        <ProFormText name="dictType" label="字典类型" disabled placeholder="请输入字典类型" />
        <ProFormText
          name="dictLabel"
          label="数据标签"
          rules={[{ required: true, message: '请输入数据标签' }]}
          placeholder="请输入数据标签"
        />
        <ProFormText
          name="dictValue"
          label="数据键值"
          rules={[{ required: true, message: '请输入数据键值' }]}
          placeholder="请输入数据键值"
        />
        <ProFormDigit
          label="显示排序"
          name="dictSort"
          min={0}
          fieldProps={{ precision: 0 }}
          rules={[{ required: true, message: '请输入显示排序' }]}
        />
        <ProFormRadio.Group name="status" label="状态" options={sys_normal_disable.options} />
        <ProFormTextArea name="remark" label="备注" placeholder="请输入备注" />
      </>
    </ModalForm>
  );
};

export default DictModal;
