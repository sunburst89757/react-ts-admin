import { AxiosRequestConfig, AxiosResponse } from "axios";
export interface Interceptors {
  requestSuccess?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestErr?: (err: any) => any;
  responseSuccess?: (res: AxiosResponse) => AxiosResponse;
  responseErr?: (err: any) => any;
}
export interface RequestConfig extends AxiosRequestConfig {
  interceptors?: Interceptors;
}
