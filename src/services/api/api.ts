import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class BaseAPI {
  private axiosInstance: AxiosInstance;
  private getHeaders: any;

  constructor(config?: AxiosRequestConfig) {
    const aa = {
      'api-key': 'API_KEY',
    };
    this.getHeaders = () => aa;
    this.axiosInstance = axios.create({ ...config, headers: this.getHeaders() });
  }

  get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get(url, config);
  }

  post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post(url, data, config);
  }

  put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.put(url, data, config);
  }

  delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete(url, config);
  }
}

export default new BaseAPI();
