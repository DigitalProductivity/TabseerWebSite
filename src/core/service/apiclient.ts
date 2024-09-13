import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
import type { FetchArrayResponse, FetchResponse } from './api-data-types';

interface URLMapperType {
  [key: string]: string;
}
const urlMapper: URLMapperType = {
  prod: 'https://annztech.com/lawyerapi',
  uat: '',
  dev: '',
};

const axiosInstance = axios.create({
  baseURL: urlMapper.prod,
  headers: {
    user: 'b2b',
  },
});

axiosInstance.interceptors.request.use((x) => {
  const accessTokenString = localStorage?.getItem('token');
  const accessToken = accessTokenString ? JSON.parse(accessTokenString) : null;



  if (accessToken!=null) {
    x.headers.Authorization = `Bearer ${accessToken}`;
  }

  return x;
});



axiosInstance.interceptors.response.use((x) => {

  return x;
});

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = async (
    config: AxiosRequestConfig
  ): Promise<FetchArrayResponse<T>> => {
    return await axiosInstance
      .get<FetchArrayResponse<T>>(this.endpoint, config)
      .then((res) => res.data)
      .catch((error) => error);
  };

  get = async (config: AxiosRequestConfig): Promise<FetchResponse<T>> => {
    return await axiosInstance
      .get<FetchResponse<T>>(this.endpoint, config)
      .then((res) => res.data);
  };

  post = async (data: T): Promise<FetchResponse<T>> => {
    return await axiosInstance
      .post<FetchResponse<T>>(this.endpoint, data)
      .then((res) => res.data)
      .catch((error) => {
        // console.log(error);
        const errorMsg: any = 'Something went wrong. Please try again later';
        return errorMsg;
      });
  };

  patch = async (data: any, config: AxiosRequestConfig = {}): Promise<FetchResponse<T>> => {
    return await axiosInstance
      .patch<FetchResponse<T>>(this.endpoint, data, config)
      .then((res) => res.data)
      .catch((error) => {
        // console.log(error);
        const errorMsg: any = 'Something went wrong. Please try again later';
        return errorMsg;
      });
  };

  postAll = async (data: T): Promise<FetchArrayResponse<T>> => {
    return await axiosInstance
      .post<FetchArrayResponse<T>>(this.endpoint, data)
      .then((res) => res.data);
  };
}

export default APIClient;
