import type { FC } from 'react';
import { ModalForm, ProFormCheckbox, ProFormUploadDragger } from '@ant-design/pro-form';
import type { UserListItem } from '../data.d';
import { useEffect } from 'react';
import { Form } from 'antd';
import { download } from '@/services/ant-design-pro/api';
import { Button } from 'antd';
// import { ls } from '@/utils';

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
  // const upload = {
  //   // 是否禁用上传
  //   isUploading: false,
  //   // 是否更新已经存在的用户数据
  //   updateSupport: 0,
  //   // 设置上传的请求头部
  //   headers: { Authorization: 'Bearer ' + ls.getItem('token') },
  //   // 上传的地址
  //   url: '/api/system/user/importData',
  // };
  useEffect(() => {}, [visible]);
  return (
    <ModalForm<UserListItem>
      form={form}
      visible={visible}
      title="用户导入"
      width={540}
      layout={'vertical'}
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
        <ProFormUploadDragger name="dragger" action="#" />
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <ProFormCheckbox.Group name="updateSupport" options={['是否更新已经存在的用户数据']} />
          <div>
            <span>仅允许导入xls、xlsx格式文件。</span>
            <Button type="link" onClick={importTemplate}>
              下载模板
            </Button>
          </div>
        </div>
      </>
    </ModalForm>
  );
};

export default UploadModal;
