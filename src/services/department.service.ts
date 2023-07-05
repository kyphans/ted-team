import baseAPI from './api/api';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

function getAllDepartment<T>(): Promise<AxiosResponse<T>> {
  return baseAPI.get('/api/v1/department/');
}

function getDepartment<T>(departmentId: number): Promise<AxiosResponse<T>> {
  return baseAPI.get(`/api/v1/department/${departmentId}`);
}

export default {
  getAllDepartment,
  getDepartment
};
