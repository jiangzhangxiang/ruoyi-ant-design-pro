import { request } from 'umi';

/** 根据参数键名查询参数值 GET system/config/configKey */
export async function configKey(key?: string) {
  return request<any>('/api/system/config/configKey/' + key, {
    method: 'GET',
  });
}
