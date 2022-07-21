import { Form, Button } from 'react-core-form';
import { request } from 'ice';
import './index.less';

const prefixCls = 'app-login';

export default () => {
  const [form] = Form.useForm();
  const onSubmit = async () => {
    const values = await form.submit();
    const { data } = await request.post('/api/user/login', values);
    localStorage.setItem('token', JSON.stringify(data));
    location.reload();
  };
  return (
    <div className={prefixCls}>
      <div className={`${prefixCls}-left`} />
      <div className={`${prefixCls}-right`}>
        <div className={`${prefixCls}-right-contianer`}>
          <h2>用户登录</h2>
          <Form
            form={form}
            schema={[
              {
                type: 'Input',
                name: 'login',
                label: '账号',
                required: true,
                props: {
                  autoComplete: 'off',
                },
              },
              {
                type: 'Password',
                name: 'password',
                label: '密码',
                required: true,
              },
            ]}
          />
          <Button type="primary" spin onClick={onSubmit}>
            登录
          </Button>
        </div>
      </div>
    </div>
  );
};
