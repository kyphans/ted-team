import { AxiosResponse } from 'axios';
import baseAPI from './api/api';
import fakeAPI from './api/fakeApi';
import { useAuth } from '../context/AuthContext';

interface User {
  email: string;
  password: string;
}

async function login<T>(data: User): Promise<AxiosResponse<T>> {
  const response: AxiosResponse = await baseAPI().post('/api/v1/auth/login', data);
  return response;
}

export default { login };
