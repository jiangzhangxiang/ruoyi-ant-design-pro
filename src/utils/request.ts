import type { RequestConfig } from '@@/plugin-request/request';
import type { RequestOptionsInit } from 'umi-request';
import { message, Modal } from 'antd';
import { ls } from '@/utils/index';
import errorCode from '@/utils/errorCode';
import { loginOut } from '@/components/RightContent/AvatarDropdown';

/**
 * @description: TODO 数据处理
 */

const transform: any = {
  /**
   * @description: 处理请求数据
   */
  transformRequestData: (
    url: string,
    options: Omit<RequestOptionsInit, ''> & {
      // 需要对请求数据进行处理
      isTransformRequestData?: boolean;
    },
  ) => {
    return options;
  },

  /**
   * @description: 处理响应数据数据
   */
  transformResponseData: (response: Response) => {
    return response;
  },
};

/**
 * 请求拦截封装
 */

// 请求前拦截器
const requestInterceptors = (url: string, options: RequestOptionsInit) => {
  // isToken 不是 false 的请求头添加 token
  let Authorization = '';
  if (ls.getItem('token') && options?.isToken !== false) {
    Authorization = ls.getItem('token');
  }
  const authHeader = { Authorization: 'Bearer ' + Authorization };
  const transformOptions = transform.transformRequestData(url, options);
  // // get请求映射params参数
  // if (options.method === 'get' && options.params) {
  //   let u = options.url + '?' + tansParams(options.params);
  //   u = u.slice(0, -1);
  //   options.params = {};
  //   options.url = u;
  // }
  return {
    url: `${url}`,
    options: { ...transformOptions, interceptors: true, headers: authHeader },
  };
};

// 响应拦截器
const responseInterceptors = async (response: Response, options: RequestOptionsInit) => {
  if (options?.responseType === 'blob') {
    return response;
  }
  const res = await response.clone().json();
  const transformResponse = transform.transformResponseData(res, options);

  const { code } = transformResponse;
  if (code === 401) {
    Modal.confirm({
      title: '系统提示',
      content: '登录状态已过期，您可以继续留在该页面，或者重新登录',
      okText: '重新登录',
      cancelText: '取消',
      type: 'warning',
      onOk: () => {
        loginOut();
      },
    });
    return Promise.reject('无效的会话，或者会话已过期，请重新登录。');
  } else if (code !== 200) {
    return Promise.reject({ transformResponse, options });
  } else {
    return transformResponse;
  }
};

// 统一的错误处理
const errorHandler = (error: any) => {
  const { res } = error;
  message.error(`${res.msg || res.errorMessage || errorCode[res.code] || errorCode['default']}`);
  return Promise.reject(res);
};

export const request: RequestConfig = {
  errorHandler,
  responseInterceptors: [responseInterceptors],
  requestInterceptors: [requestInterceptors],
};
