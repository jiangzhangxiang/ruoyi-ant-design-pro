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
  const msg = `请输入的${current?.userName}新密码`;
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
          label={msg}
          rules={[
            { required: true, message: msg },
            { min: 5, max: 20, message: '用户密码长度必须介于 5 和 20 之间' },
          ]}
          placeholder={msg}
        />
      </>
    </ModalForm>
  );
};

export default ResetPwdModal;
