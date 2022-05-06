import type { FC } from 'react';
import { ModalForm, ProForm, ProFormCheckbox } from '@ant-design/pro-form';
import type { UserListItem } from '../data.d';
import { useEffect } from 'react';
import { Form } from 'antd';
import { download } from '@/services/ant-design-pro/api';
import { Button } from 'antd';

export type UploadModalProps = {
  visible: boolean;
  onSubmit: (values: UserListItem) => void;
  onCancel: () => void;
};

/** 下载模板操作 */
const importTemplate = () => {
  download('/api/system/user/importTemplate', {}, `user_template_${new Date().getTime()}.xlsx`);
};

const UploadModal: FC<UploadModalProps> = (props) => {
  const { visible, onSubmit, children, onCancel } = props;
  const [form] = Form.useForm();

  useEffect(() => {}, [visible]);
  return (
    <ModalForm<UserListItem>
      form={form}
      visible={visible}
      title="用户导入"
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
          <ProFormCheckbox.Group
            name="checkbox"
            layout="vertical"
            label=""
            options={['是否更新已经存在的用户数据']}
          />
          <span>
            仅允许导入xls、xlsx格式文件。{' '}
            <Button type="link" onClick={importTemplate}>
              下载模板
            </Button>
          </span>
        </ProForm.Group>
      </>
    </ModalForm>
  );
};

export default UploadModal;
