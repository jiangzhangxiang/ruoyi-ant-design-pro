import { request } from 'umi';

/** 根据参数键名查询参数值 GET system/config/configKey */
export async function configKey(key?: string) {
  return request<any>('/api/system/config/configKey/' + key, {
    method: 'GET',
  });
}

/** 查询字典数据 GET system/dict/data/type */
export async function getDicts(key?: string) {
  return request<any>('/api/system/dict/data/type/' + key, {
    method: 'GET',
  });
}
