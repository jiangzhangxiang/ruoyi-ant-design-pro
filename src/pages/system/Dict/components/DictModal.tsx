import type { FC } from 'react';
import { ModalForm, ProFormText, ProFormRadio, ProFormTextArea } from '@ant-design/pro-form';
import type { DictListItem } from '../data.d';
import { getDict } from '@/services/system/dict/type';
import { useEffect } from 'react';
import { Form } from 'antd';
import useDict from '@/hooks/useDict';

export type DictModalProps = {
  visible: boolean;
  current: Partial<DictListItem> | undefined;
  onSubmit: (values: DictListItem) => void;
  onCancel: () => void;
  type: string;
};

const titleMap = {
  edit: '修改字典类型',
  add: '新增字典类型',
};

const DictModal: FC<DictModalProps> = (props) => {
  const { visible, current, onSubmit, onCancel, type } = props;
  const [form] = Form.useForm();
  const { sys_normal_disable } = useDict({
    dictType: ['sys_normal_disable'],
  });

  /**
   * 初始化表单数据
   */
  const initData = async () => {
    if (visible && type === 'edit') {
      const { data } = await getDict(current?.dictId);
      form?.setFieldsValue({ ...data });
    }
    if (!visible && current) {
      form.resetFields();
    }
  };

  useEffect(() => {
    initData();
  }, [visible]);
  return (
    <ModalForm<DictListItem>
      form={form}
      visible={visible}
      title={titleMap[type]}
      width={540}
      onFinish={async (values) => {
        onSubmit(values);
      }}
      modalProps={{
        onCancel: onCancel,
      }}
    >
      <>
        <ProFormText
          name="dictName"
          label="字典名称"
          rules={[{ required: true, message: '请输入字典名称' }]}
          placeholder="请输入字典名称"
        />
        <ProFormText
          name="dictType"
          label="字典类型"
          rules={[{ required: true, message: '请输入字典类型' }]}
          placeholder="请输入字典类型"
        />
        <ProFormRadio.Group name="status" label="状态" options={sys_normal_disable.options} />
        <ProFormTextArea name="remark" label="备注" placeholder="请输入备注" />
      </>
    </ModalForm>
  );
};

export default DictModal;
