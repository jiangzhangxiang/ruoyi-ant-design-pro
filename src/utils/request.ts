import type { RequestConfig } from '@@/plugin-request/request';
import type { RequestOptionsInit } from '/Users/issuser/myproject/ruoyi-ant-design-pro/node_modules/umi-request';
/**
 * 请求拦截封装
 * @param response
 * @param options
 */
const authHeaderInterceptor = (url: string, options: RequestOptionsInit) => {
  const authHeader = { Authorization: 'Bearer xxxxxx' };
  return {
    url: `${url}`,
    options: { ...options, interceptors: true, headers: authHeader },
  };
};
const responseInterceptors = (response: Response, options: RequestOptionsInit) => {
  console.log('response', response);
  console.log('options', options);
  return response;
};
const errorHandler = (err: any) => {
  console.log('err', err);
  return err;
};

export const request: RequestConfig = {
  errorHandler,
  responseInterceptors: [responseInterceptors],
  // 新增自动添加AccessToken的请求前拦截器
  requestInterceptors: [authHeaderInterceptor],
};
