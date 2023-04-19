import baseAPI from './api/api';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

function getAllUsers<T>(): Promise<AxiosResponse<T>> {
  const config: AxiosRequestConfig = {
    // baseURL: 'https://fakestoreapi.com',
    baseURL: 'http://localhost:3333',
  };
  // return baseAPI().get('/users', config);
  return baseAPI().get('/api/v1/users', config);
}

export default {
  getAllUsers,
};
