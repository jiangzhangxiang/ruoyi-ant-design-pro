import type { FC } from 'react';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import type { UserListItem } from '../data.d';

type UserModalProps = {
  visible: boolean;
  current: Partial<UserListItem>;
  onSubmit: (values: UserListItem) => void;
  onCancel: () => void;
};

const ResetPwdModal: FC<UserModalProps> = (props) => {
  const { visible, onSubmit, children, onCancel, current } = props;
  return (
    <ModalForm<UserListItem>
      visible={visible}
      title={'提示'}
      width={416}
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
          name="password"
          label={`请输入的${current?.userName}新密码`}
          rules={[{ required: true, message: '请输入用户昵称' }]}
          placeholder="请输入用户昵称"
        />
      </>
    </ModalForm>
  );
};

export default ResetPwdModal;
