import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

interface BaseAPIOptions {
  config?: AxiosRequestConfig;
  headers?: any;
  timeout?: number;
  baseURL?: string;
}

function baseAPI(options?: BaseAPIOptions) {

  async function getFunc<T>(url: string, config?: AxiosRequestConfig): Promise<any> {
    try {
      const response = {
        data: {},
        status: 401,
        statusText: 'Unauthorized',
        headers: {},
        config: config,
      };
      if (!!response.data && response.status === 200) {
        return response;
      } else if (response.status === 401) {
        window.location.href = "/login";
      }
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // Fake response post API
  async function postFunc<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
    try {
      const response = {
        data: { ...data, token: 'token-12312313132132131313' },
        status: 401,
        statusText: 'OK',
        headers: {},
        config: config,
      };
      return response;
    } catch (error: any) {
      return Promise.reject(error);
    }
  }

  return {
    get: getFunc,
    post: postFunc,
  };
}

export default baseAPI();
