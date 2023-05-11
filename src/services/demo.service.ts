import baseAPI from './api/api';
import fakeAPI from './api/fakeApi';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

function getAllUsers<T>(): Promise<AxiosResponse<T>> {
  return baseAPI.get('api/v1/user/list/');
}

export default {
  getAllUsers,
};
