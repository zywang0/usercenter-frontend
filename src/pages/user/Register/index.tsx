import Footer from '@/components/Footer';
import {register} from '@/services/ant-design-pro/api';
import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormText,
} from '@ant-design/pro-components';
import {message, Tabs} from 'antd';
import React, {useState} from 'react';
import {history} from 'umi';
import styles from './index.less';
import {SYSTEM_DESCRIPTION, SYSTEM_LOGO} from "@/constants";

const Register: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const handleSubmit = async (values: API.RegisterParams) => {
    const {userPassword, checkPassword} = values;
    if (userPassword !== checkPassword) {
      message.error('The password entered again does not match.');
      return;
    }
    try {
      // 注册
      const id = await register(values);
      if (id) {
        const defaultLoginSuccessMessage = '注册成功！';
        message.success(defaultLoginSuccessMessage);
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const {query} = history.location;
        history.push({
          pathname: 'user/login',
          query,
        });
        return;
      }else {
        throw new Error('register error id = ${id}');
      }
    } catch (error) {
      const defaultLoginFailureMessage = '注册失败，请重试！';
      message.error(defaultLoginFailureMessage);
    }
  };
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
            await handleSubmit(values as API.RegisterParams);
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane key="account" tab={'Register'}/>
          </Tabs>

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
              <ProFormText
                name="number"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon}/>,
                }}
                placeholder={'Please input your number'}
                rules={[
                  {
                    required: true,
                    message: 'Number is required!',
                  },
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
