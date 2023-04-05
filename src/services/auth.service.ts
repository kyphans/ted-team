import { AxiosResponse } from 'axios';
import baseAPI from './api/api';
import fakeAPI from './api/fakeApi';
import { useAuth } from '../context/AuthContext';

interface User {
  username: string;
  password: string;
}

async function login<T>(data: User): Promise<AxiosResponse<T>> {
  const response: AxiosResponse = await fakeAPI().post('/api/v1/login', data);
  return response;
}

export default { login };
