import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { RequestConfig } from "./types";
export class MyRequest {
  service: AxiosInstance;
  constructor(config: RequestConfig) {
    this.service = axios.create(config);
    this.service.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        console.log("所有实例都请求拦截成功");
        return config;
      },
      (err: any) => {
        console.log(err, "所有实例都请求拦截失败");
        return Promise.reject(err);
      }
    );
    // 不同实例的请求拦截器
    this.service.interceptors.request.use(
      config.interceptors?.requestSuccess,
      config.interceptors?.requestErr
    );
    this.service.interceptors.response.use(
      (res: AxiosResponse) => {
        console.log(res, "公共响应拦截成功");
        return res.data;
      },
      (err) => {
        console.log(err, "公共响应拦截失败");
        return Promise.reject(err);
      }
    );
    // 不同实例的响应拦截器
    this.service.interceptors.response.use(
      config.interceptors?.responseSuccess,
      config.interceptors?.responseErr
    );
  }
  request(config: RequestConfig) {
    return this.service.request(config);
  }
}
