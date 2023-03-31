import BaseService from './base.service';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

interface UserPayload {
  username: string;
  password: string;
}
interface Parameters {
  type: string;
  m_id: number;
}

class AuthService extends BaseService {
  getTest<T>(params: Parameters): Promise<AxiosResponse<T>> {
    const config: AxiosRequestConfig = { params };
    return this.get('/users', config);
  }

  createTest<T>(payload: UserPayload): Promise<AxiosResponse<T>> {
    return this.post('/users', payload);
  }
}

export default new AuthService();
