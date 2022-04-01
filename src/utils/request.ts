import type { RequestConfig } from '@@/plugin-request/request';
import type { RequestOptionsInit } from '/Users/issuser/myproject/ruoyi-ant-design-pro/node_modules/umi-request';
import { message } from 'antd';
import { ls, tansParams } from '@/utils/index';
import errorCode from '@/utils/errorCode';

/**
 * 请求拦截封装
 */

// 新增自动添加AccessToken的请求前拦截器
const authHeaderInterceptor = (url: string, options: RequestOptionsInit) => {
  // isToken 不是 false 的请求头添加 token
  let Authorization = '';
  if (ls.getItem('token') && options?.isToken !== false) {
    Authorization = ls.getItem('token');
  }
  const authHeader = { Authorization: 'Bearer ' + Authorization };

  // get请求映射params参数
  if (options.method === 'get' && options.params) {
    let u = options.url + '?' + tansParams(options.params);
    u = u.slice(0, -1);
    options.params = {};
    options.url = u;
  }

  return {
    url: `${url}`,
    options: { ...options, interceptors: true, headers: authHeader },
  };
};

// 响应拦截器
const responseInterceptors = async (response: Response, options: RequestOptionsInit) => {
  const res = await response.clone().json();
  if (res.code !== 200) {
    return Promise.reject({ res, options });
  }
  return response;
};

// 统一的错误处理
const errorHandler = (error: any) => {
  const { res } = error;
  message.error(`${res.msg || res.errorMessage || errorCode[res.code] || errorCode['default']}`);
  return res;
};

export const request: RequestConfig = {
  errorHandler,
  responseInterceptors: [responseInterceptors],
  requestInterceptors: [authHeaderInterceptor],
};
