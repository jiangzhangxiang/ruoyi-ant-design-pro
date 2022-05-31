import type { FC } from 'react';
import { ModalForm } from '@ant-design/pro-form';
import type { OperlogListItem } from '../data';
import { useEffect } from 'react';
import { Form } from 'antd';
import ProDescriptions from '@ant-design/pro-descriptions';
import useDict from '@/hooks/useDict';

export type LogininforModalProps = {
  visible: boolean;
  current: Partial<OperlogListItem> | undefined;
  onSubmit?: (values: OperlogListItem) => void;
  onCancel?: () => void;
  type: string;
};

const titleMap = {
  details: '操作日志详细',
};

const LogininforModal: FC<LogininforModalProps> = (props) => {
  const { visible, current, onCancel, type } = props;
  const { sys_common_status, sys_oper_type } = useDict({
    dictType: ['sys_common_status', 'sys_oper_type'],
  });

  const columns = [
    {
      title: '日志编号',
      dataIndex: 'operId',
      hideInSearch: true,
    },
    {
      title: '系统模块',
      dataIndex: 'title',
    },
    {
      title: '操作类型',
      dataIndex: 'operatorType',
      valueEnum: sys_oper_type?.valueEnum,
    },
    {
      title: '请求方式',
      dataIndex: 'requestMethod',
      hideInSearch: true,
    },
    {
      title: '操作人员',
      dataIndex: 'operName',
    },
    {
      title: '操作地址',
      dataIndex: 'operIp',
      hideInSearch: true,
    },
    {
      title: '操作地点',
      dataIndex: 'operLocation',
      hideInSearch: true,
    },
    {
      title: '操作状态',
      dataIndex: 'status',
      valueEnum: sys_common_status?.valueEnum,
    },
    {
      title: '操作时间',
      dataIndex: 'operTime',
      valueType: 'dataTime',
    },
  ];
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
      width={710}
      trigger={<></>}
      modalProps={{
        onCancel: onCancel,
        destroyOnClose: true,
        okText: false,
        cancelText: false,
      }}
    >
      <ProDescriptions dataSource={current} columns={columns} />
    </ModalForm>
  );
};

export default LogininforModal;
