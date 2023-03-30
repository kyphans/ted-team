import API from './api/api';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

interface HeaderRequestConfig extends AxiosRequestConfig {
  baseURL?: string;
}

class BaseService {
  private defaultConfig: HeaderRequestConfig = { baseURL: 'https://example.com.vn' };

  get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return API.get(url, { ...this.defaultConfig, ...config });
  }

  post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return API.post(url, data, { ...this.defaultConfig, ...config });
  }

  put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return API.put(url, data, { ...this.defaultConfig, ...config });
  }

  delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return API.delete(url, { ...this.defaultConfig, ...config });
  }
}

export default BaseService;
