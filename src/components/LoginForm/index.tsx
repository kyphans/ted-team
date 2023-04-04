import { Button, Form, Input, Card } from 'antd';
import AuthService from '../../services/auth.service';
import { useMutation } from '@tanstack/react-query';
import { useNotification } from '../../context/NotificationContext';
import { useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';

function LoginForm() {
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const { login: authLogin } = useAuth();

  const handleLoginSuccess = (data:any) => {
    console.log('handleLoginSuccess data', data);
    addNotification('Đăng nhập thành công', 'success');
    authLogin(data?.data?.token);
    navigate('/')
  };
  const handleLoginFailed = (err: any) => {
    addNotification(err?.message, 'error');
  };

  const { mutate, isLoading }: any = useMutation(AuthService.login<any>, {
    onSuccess: handleLoginSuccess,
    onError: handleLoginFailed,
  });

  const onFinish = (values: any) => {
    mutate({ username: values.username, password: values.password });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Card>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600}}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 16 }}>
            <Button className="w-full" type="primary" htmlType="submit" loading={isLoading}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default LoginForm;
