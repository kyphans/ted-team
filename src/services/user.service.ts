import baseAPI from './api/api';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

function getAllUsers<T>(): Promise<AxiosResponse<T>> {
  return baseAPI.get('api/v1/user/list/');
}

function createUser<T>(payload: any): Promise<AxiosResponse<T>> {
  const customConfig: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  return baseAPI.post('/api/v1/user/create/', payload, customConfig);
}

export default {
  getAllUsers,
  createUser,
};
