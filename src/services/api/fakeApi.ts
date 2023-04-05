import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

interface BaseAPIOptions {
  config?: AxiosRequestConfig;
  headers?: any;
  timeout?: number;
  baseURL?: string;
}

function baseAPI(options?: BaseAPIOptions) {

  // Fake response post API
  async function postFunc<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
    try {
      const response = {
        data: { ...data, token: 'token-12312313132132131313' },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: config,
      };
      console.log('Fake postFunc');
      return Promise.resolve(response);
    } catch (error: any) {
      return Promise.reject(error);
    }
  }

  return {
    post: postFunc,
  };
}

export default baseAPI;
