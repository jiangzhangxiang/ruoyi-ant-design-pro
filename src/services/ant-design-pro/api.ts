import { request } from 'umi';
import { blobValidate, tansParams } from '@/utils';
import { message } from 'antd';
import errorCode from '@/utils/errorCode';
// @ts-ignore
import { saveAs } from 'file-saver';
/** 获取图形验证码 */
export async function captchaImage(options?: { [key: string]: any }) {
  return request<API.FakeCaptcha>('/captchaImage', {
    method: 'GET',
    isToken: false,
    ...(options || {}),
  });
}

/** 获取当前的用户 GET /currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    user: API.CurrentUser;
  }>('/getInfo', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    isToken: false,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

// 通用下载方法
export async function download(url: any, params: any, filename: any) {
  const hide = message.loading('正在下载数据，请稍候', 0);
  request<API.NoticeIconList>(url, {
    params,
    method: 'POST',
    ...{
      transformRequest: [
        (p: any) => {
          return tansParams(p);
        },
      ],
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      responseType: 'blob',
    },
  })
    .then(async (data: any) => {
      const isLogin = await blobValidate(data);
      if (isLogin) {
        const blob = new Blob([data]);
        saveAs(blob, filename);
      } else {
        const resText = await data.text();
        const rspObj = JSON.parse(resText);
        const errMsg = errorCode[rspObj.code] || rspObj.msg || errorCode['default'];
        return message.error(errMsg);
      }
      hide();
    })
    .catch((err) => {
      hide();
      console.error(err);
      message.error('下载文件出现错误，请联系管理员！');
    });
}
