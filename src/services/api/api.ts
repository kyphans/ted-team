import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

interface BaseAPIOptions {
  config?: AxiosRequestConfig;
  headers?: any;
  timeout?: number;
  baseURL?: string;
}

function baseAPI(options?: BaseAPIOptions) {
  const token = {
    'api-key': 'KkKKkkkkAAAMAMAMAMAMAMQQQQWWWWRRRRRR',
  };
  const getTokenAPI = () => {
    const localStorageItem = localStorage.getItem('token');
    return localStorageItem ? { 'api-key': localStorageItem } : token;
  };
  const axiosInstance: AxiosInstance = axios.create({
    ...options?.config,
    baseURL: options?.baseURL || 'http://example-api.com',
    headers: options?.headers || getTokenAPI(),
    timeout: options?.timeout || 10000,
  });

  function handleResponseData<T>(data?: any): Promise<AxiosResponse<T>> {
    if (!!data && data.status === 200) {
      return Promise.resolve(data);
    }
    return Promise.reject(data);
  }

  async function getFunc<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      const response = await axiosInstance.get<T>(url, config);
      return handleResponseData<T>(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async function postFunc<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      const response = await axiosInstance.post<T>(url, data, config);
      return handleResponseData<T>(response);
    } catch (error: any) {
      return Promise.reject(error);
    }
  }

  async function putFunc<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      const response = await axiosInstance.put<T>(url, data, config);
      return handleResponseData<T>(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async function deleteFunc<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      const response = await axiosInstance.delete<T>(url, config);
      return handleResponseData<T>(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  return {
    get: getFunc,
    post: postFunc,
    put: putFunc,
    delete: deleteFunc,
  };
}

export default baseAPI;
