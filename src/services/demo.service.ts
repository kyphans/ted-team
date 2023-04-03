import BaseService from './base.service';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

class DemoService extends BaseService {
  // Using mock data in https://fakestoreapi.com/docs

  getAllUsers<T>(): Promise<AxiosResponse<T>> {
    const config: AxiosRequestConfig = {
      baseURL: 'https://fakestoreapi.com',
    };
    return this.get('/users', config);
  }
}

export default new DemoService();
