// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取图形验证码 */
export async function captchaImage(options?: { [key: string]: any }) {
  return request<API.FakeCaptcha>('/api/captchaImage', {
    method: 'GET',
    isToken: false,
    ...(options || {}),
  });
}
