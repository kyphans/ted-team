import baseAPI from './api/api';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

function getAllUsers<T>(): Promise<AxiosResponse<T>> {
  const config: AxiosRequestConfig = {
    baseURL: 'https://fakestoreapi.com',
  };
  return baseAPI().get('/users', config);
}

export default {
  getAllUsers,
};
