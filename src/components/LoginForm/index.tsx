import React, { useEffect } from 'react';
import { Button, Form, Input, Card } from 'antd';
import { useQuery } from '@tanstack/react-query';
import AuthService from '../../services/auth.service';
import { useNotification } from '../Notification/NotificationContext';
import { useNavigate } from 'react-router';

function LoginForm() {
  const navigate = useNavigate();
  const { addNotification } = useNotification();

  const handleLoginSuccess = () => {
    addNotification('Đăng nhập thành công', 'success');
    navigate('/');
  };

  const { data, refetch, isFetching, isError, error }: any = useQuery({
    queryKey: ['login'],
    queryFn: () => AuthService.login<any>({ username: 'admin', password: '123' }),
    enabled: false,
    onSuccess: handleLoginSuccess,
    onError: (err: any) => addNotification(err?.message, 'error'),
  });

  const onFinish = (values: any) => {
    refetch({ values });
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <div className="w-full h-screen flex justify-center items-center">
        <Card>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
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

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit" loading={isFetching}>
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
}

export default LoginForm;
