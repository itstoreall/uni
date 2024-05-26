import axios, { AxiosRequestConfig } from 'axios';

export enum Method {
  GET = 'GET',
  POST = 'POST'
}

export type RequestConfig = {
  method: Method;
  url: string;
};

export const makeRequest = async (config: RequestConfig) => {
  try {
    const axiosConfig: AxiosRequestConfig = { ...config };
    const response = await axios(axiosConfig);
    // console.log('makeRequest data:', response.data); // *
    return response?.data;
  } catch (e) {
    return (e as Error).message;
  }
};
