import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Table } from 'antd';
import DemoService from '../../services/demo.service';

function Login() {
  // Access the client
  const queryClient = useQueryClient();

  // Queries
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['users'],
    queryFn: () => DemoService.getAllUsers<any>(),
    staleTime: 5 * 60 * 1000, // 5 minute
  });

  console.log({ isFetching, isLoading, data });
  console.log('==============');

  function normalizeData(data: any) {
    return data?.map((item: any) => ({
      key: item.id,
      id: item.id,
      name: `${item.name.firstname} ${item.name.lastname}`,
      email: item.email,
      phone: item.phone,
      address: `${item.address.number}, ${item.address.street}, ${item.address.city}`,
    }));
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  return (
    <>
      <span> Test Component</span>
      <Table loading={isFetching} dataSource={normalizeData(data?.data)} columns={columns} />
    </>
  );
}

export default Login;