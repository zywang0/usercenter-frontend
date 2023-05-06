import {GithubOutlined, LinkedinOutlined, MailOutlined} from '@ant-design/icons';
import {DefaultFooter} from '@ant-design/pro-components';

const Footer: React.FC = () => {
  const defaultMessage = 'User Center';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'LinkedIn',
          title: <><LinkedinOutlined/> LinkedIn </>,
          href: 'https://www.linkedin.com/in/zhengyang-wang/',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <><GithubOutlined/> Github </>,
          href: 'https://github.com/zywang0',
          blankTarget: true,
        },
        {
          key: 'gmail',
          title: <><MailOutlined/> Gmail </>,
          href: 'mailto:zy867031254@gmail.com',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
