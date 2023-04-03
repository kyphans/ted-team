import BaseService from './base.service';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
interface User {
  username: string;
  password: string;
}
class AuthService extends BaseService {
  path: string | undefined = '/api/v1';

  async login<T>(data: User): Promise<AxiosResponse<T>> {
    const response: AxiosResponse = await this.post(this.path + '/login', data);
    const token = response.data.token; // Giả sử token nằm trong trường 'token' của response
    console.log('dang nhap thanh cong., token la: ', token);
    localStorage.setItem('token', token);
    return response;
  }
}

export default new AuthService();
