import type { RequestConfig } from '@@/plugin-request/request';
import type { RequestOptionsInit } from '/Users/issuser/myproject/ruoyi-ant-design-pro/node_modules/umi-request';
import { message } from 'antd';

/**
 * 请求拦截封装
 */

// 新增自动添加AccessToken的请求前拦截器
const authHeaderInterceptor = (url: string, options: RequestOptionsInit) => {
  const authHeader = { Authorization: 'Bearer xxxxxx' };
  return {
    url: `${url}`,
    options: { ...options, interceptors: true, headers: authHeader },
  };
};

// 响应拦截器
const responseInterceptors = async (response: Response) => {
  const res = await response.clone().json();
  if (res.code !== 200) {
    return Promise.reject(res);
  }
  return response;
};

// 统一的错误处理
const errorHandler = (error: any) => {
  const { response } = error;
  message.error(`${error.msg}`);
  return response;
};

export const request: RequestConfig = {
  errorHandler,
  responseInterceptors: [responseInterceptors],
  requestInterceptors: [authHeaderInterceptor],
};
