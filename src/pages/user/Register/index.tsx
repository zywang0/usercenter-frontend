import Footer from '@/components/Footer';
import {login} from '@/services/ant-design-pro/api';
import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormText,
} from '@ant-design/pro-components';
import {Alert, message, Tabs} from 'antd';
import React, {useState} from 'react';
import {history} from 'umi';
import styles from './index.less';
import {SYSTEM_DESCRIPTION, SYSTEM_LOGO} from "@/constants";

const LoginMessage: React.FC<{
  content: string;
}> = ({content}) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);
const Register: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 注册
      const user = await login({
        ...values,
        type,
      });
      if (user) {
        const defaultLoginSuccessMessage = '注册成功！';
        message.success(defaultLoginSuccessMessage);
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const {query} = history.location;
        const {redirect} = query as {
          redirect: string;
        };
        history.push(redirect || '/');
        return;
      }
      // 如果失败去设置用户错误信息
      setUserLoginState(user);
    } catch (error) {
      const defaultLoginFailureMessage = '注册失败，请重试！';
      message.error(defaultLoginFailureMessage);
    }
  };
  const {status, type: loginType} = userLoginState;
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          submitter={{
            searchConfig: {
              submitText: 'Register'
            }
          }}
          logo={<img alt="logo" src={SYSTEM_LOGO}/>}
          title="User Center"
          subTitle={<a href={SYSTEM_DESCRIPTION} target="_blank" rel="noreferrer">Descriptions about User Center.</a>}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane key="account" tab={'Register'}/>
          </Tabs>

          {status === 'error' && loginType === 'account' && (
            <LoginMessage content={'Wrong account and password'}/>
          )}
          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon}/>,
                }}
                placeholder={'Please input your user account'}
                rules={[
                  {
                    required: true,
                    message: 'User account is required!',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon}/>,
                }}
                placeholder={'Please input your user password'}
                rules={[
                  {
                    required: true,
                    message: 'User password is required!',
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: 'Length cannot less than 8.',
                  }
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon}/>,
                }}
                placeholder={'Please confirm your user password'}
                rules={[
                  {
                    required: true,
                    message: 'Confirm password is required!',
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: 'Length cannot less than 8.',
                  }
                ]}
              />
            </>
          )}
        </LoginForm>
      </div>
      <Footer/>
    </div>
  )
    ;
};
export default Register;
