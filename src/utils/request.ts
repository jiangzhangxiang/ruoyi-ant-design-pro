import type { RequestConfig } from '@@/plugin-request/request';
import type { RequestOptionsInit } from 'umi-request';
import { message, Modal } from 'antd';
import { ls, tansParams } from '@/utils/index';
import errorCode from '@/utils/errorCode';
import { loginOut } from '@/components/RightContent/AvatarDropdown';
import getErrorModeContent from './errorModal';
import { ResponseError } from 'umi-request';

interface optionsType extends RequestOptionsInit {
  // 需要对请求数据进行处理
  isTransformRequestData?: boolean;
  // 错误消息提示类型
  errorMessageMode?: 'none' | 'modal';
}

interface errorHandlerType extends ResponseError {
  res: any;
  options: optionsType;
}

/**
 * @description: TODO 数据处理
 */

const transform: any = {
  /**
   * @description: 处理请求数据
   */
  transformRequestData: (url: string, options: optionsType) => {
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
const requestInterceptors = (url: string, options: optionsType) => {
  // isToken 不是 false 的请求头添加 token
  let Authorization = '';
  if (ls.getItem('token') && options?.isToken !== false) {
    Authorization = ls.getItem('token');
  }
  const authHeader = { Authorization: 'Bearer ' + Authorization };

  // 处理请求数据
  const transformOptions = transform.transformRequestData(url, options);

  // get请求映射params参数
  let requestUrl = transformOptions.url;
  if (transformOptions.method === 'get' && transformOptions.params) {
    let u = transformOptions.url + '?' + tansParams(transformOptions.params);
    u = u.slice(0, -1);
    transformOptions.params = {};
    requestUrl = u;
  }
  return {
    url: `${requestUrl}`,
    options: { ...transformOptions, interceptors: true, headers: authHeader },
  };
};

// 响应拦截器
const responseInterceptors = async (response: Response, options: optionsType) => {
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
    return Promise.reject({ res: transformResponse, options });
  } else {
    return transformResponse;
  }
};

// 统一的错误处理
const errorHandler = (error: errorHandlerType) => {
  const { res, options } = error;
  const errorMessageMode = options && options.errorMessageMode;
  if (res) {
    const msg = `${res.msg || res.errorMessage || errorCode[res.code] || errorCode['default']}`;
    if (errorMessageMode === 'modal') {
      Modal.error({
        title: '系统提示',
        content: getErrorModeContent(msg),
      });
    } else {
      message.error(msg);
    }
  }

  return Promise.reject(res);
};

export const request: Omit<RequestConfig, 'errorHandler'> = {
  errorHandler,
  responseInterceptors: [responseInterceptors],
  requestInterceptors: [requestInterceptors],
};
