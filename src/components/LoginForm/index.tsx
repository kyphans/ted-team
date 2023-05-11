import { Button, Form, Input, Card } from 'antd';
import AuthService from '../../services/auth.service';
import { useMutation } from '@tanstack/react-query';
import { useNotification } from '../../context/NotificationContext';
import { useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import './styles.scss';

function LoginForm() {
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const { login: authLogin } = useAuth();

  const handleLoginSuccess = (data: any) => {
    addNotification('Đăng nhập thành công', 'success');
    console.log('data', data.data);
    authLogin(data?.data);
    navigate('/');
  };

  const handleLoginFailed = (err: any) => {
    addNotification(err?.message, 'error');
  };

  const { mutate, isLoading }: any = useMutation(AuthService.login<any>, {
    onSuccess: handleLoginSuccess,
    onError: handleLoginFailed,
  });

  const onFinish = (values: any) => {
    mutate({ phone: values.phone, password: values.password });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card type="inner" title="TED TEAM">
        <Form
          name="basic"
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item name="phone" rules={[{ required: true, message: 'Please input your phone!' }]}>
            <Input placeholder="Phone number" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
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
