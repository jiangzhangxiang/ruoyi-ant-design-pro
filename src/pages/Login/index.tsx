import { LockOutlined, UserOutlined, SafetyOutlined } from '@ant-design/icons';
import { Alert, message, Row, Col } from 'antd';
import React, { useEffect, useState } from 'react';
import { ProFormText, LoginForm, ProForm } from '@ant-design/pro-form';
import { history, useModel } from 'umi';
import Footer from '@/components/Footer';
import { login } from '@/services/api';
import { captchaImage } from '@/services/api';
import styles from './index.less';
import { ls } from '@/utils';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const { initialState, setInitialState } = useModel('@@initialState');
  const [codeUrl, setCodeUrl] = useState<string>('');
  const [uuid, setUid] = useState<string>('');
  const [captchaOnOff, setCaptchaOnOff] = useState<boolean>(false);

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      await setInitialState((s) => ({ ...s, currentUser: userInfo }));
    }
  };

  /**
   * 获取验证码
   */
  const initCaptchaImage = async () => {
    try {
      const result = await captchaImage();
      setCodeUrl('data:image/gif;base64,' + result.img);
      setCaptchaOnOff(result.captchaOnOff);
      setUid(result.uuid);
      return true;
    } catch (error) {
      setCodeUrl('');
      setUid('');
      return false;
    }
  };

  /**
   * 登录
   * @param values
   */
  const handleSubmit = async (values: API.LoginParams) => {
    try {
      const msg = await login({ ...values, uuid });
      if (msg.code === 200) {
        ls.setItem('token', msg.token);
        const defaultLoginSuccessMessage = '登录成功！';
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const { query } = history.location;
        const { redirect } = query as {
          redirect: string;
        };
        history.push(redirect || '/');
        return;
      }
      setUserLoginState(msg);
      await initCaptchaImage();
    } catch (error) {
      await initCaptchaImage();
    }
  };

  useEffect(() => {
    initCaptchaImage();
  }, []);
  const { code } = userLoginState;
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          logo={<img alt="logo" src="/logo.svg" />}
          title="Ant Design"
          subTitle={'Ant Design 是西湖区最具影响力的 Web 设计规范'}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          {code && code !== 200 && <LoginMessage content={'错误的用户名和密码'} />}
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder={'用户名: admin'}
              rules={[
                {
                  required: true,
                  message: '用户名是必填项！',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder={'密码: admin123'}
              rules={[
                {
                  required: true,
                  message: '密码是必填项！',
                },
              ]}
            />
            {captchaOnOff && (
              <ProForm.Group>
                <Row>
                  <Col span={16}>
                    <ProFormText
                      name="code"
                      fieldProps={{
                        size: 'large',
                        prefix: <SafetyOutlined className={styles.prefixIcon} />,
                      }}
                      placeholder={'请输入验证码! '}
                      rules={[
                        {
                          required: true,
                          message: '验证码是必填项！',
                        },
                      ]}
                    />
                  </Col>
                  <Col span={7} offset={1}>
                    <img
                      onClick={initCaptchaImage}
                      style={{
                        height: '40px',
                        width: '100%',
                        cursor: 'pointer',
                        border: '1px solid transparent',
                        verticalAlign: 'middle',
                      }}
                      src={codeUrl}
                    />
                  </Col>
                </Row>
              </ProForm.Group>
            )}
          </>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
