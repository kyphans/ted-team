import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class BaseAPI {
  private axiosInstance: AxiosInstance;
  private getHeaders: any;

  constructor(config?: AxiosRequestConfig) {
    const aa = {
      'api-key': 'MTkyMzc=66ac6a652a3529ed3a887ca0cMTYxMzU2NzUwMw==',
    };
    this.getHeaders = () => aa;
    this.axiosInstance = axios.create({
      ...config,
      headers: this.getHeaders(),
      timeout: 10000,
    });
  }

  handleResponseData<T>(data?: any): Promise<AxiosResponse<T>> {
    if (!!data && data.status === 200) {
      return Promise.resolve(data);
    }
    return Promise.reject(data);
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      const response = await this.axiosInstance.get<T>(url, config);
      return this.handleResponseData<T>(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
  //   try {
  //     const response = await this.axiosInstance.post<T>(url, data, config);
  //     return this.handleResponseData<T>(response);
  //   } catch (error: any) {
  //     return Promise.reject(error);
  //   }
  // }

  // API POST TEST
  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
    try {
      const response = {
        data: { ...data, token: 'token-12312313132132131313' },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: config,
      };
      console.log('api base');
      return Promise.resolve(response);
    } catch (error: any) {
      return Promise.reject(error);
    }
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      const response = await this.axiosInstance.put<T>(url, data, config);
      return this.handleResponseData<T>(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      const response = await this.axiosInstance.delete<T>(url, config);
      return this.handleResponseData<T>(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default new BaseAPI();
