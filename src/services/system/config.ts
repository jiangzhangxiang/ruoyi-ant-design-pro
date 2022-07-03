import { request } from 'umi';
import type { ConfigInfo, ConfigList, ConfigListItem } from '@/pages/system/Config/data';
import { parseStrEmpty } from '@/utils';
import type { DictInfo } from '@/pages/system/Dict/data';

/** 获取参数管理列表 GET /system/config/list */
export async function list(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: Record<string, any>,
) {
  return request<ConfigList>('/system/config/list', {
    method: 'GET',
    params: params,
    ...(options || {}),
  });
}

/** 修改参数 PUT /system/config */
export async function updateConfig(data: ConfigListItem, options?: Record<string, any>) {
  return request<ConfigListItem>('/system/config', {
    method: 'PUT',
    data,
    ...(options || {}),
  });
}

/** 新建参数 POST /system/config */
export async function addConfig(data: ConfigListItem, options?: Record<string, any>) {
  return request<ConfigListItem>('/system/config', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

/** 删除参数 DELETE /system/config/ */
export async function delConfig(userId?: number[] | number) {
  return request<Record<string, any>>('/system/config/' + userId, {
    method: 'DELETE',
  });
}

/** 查询参数详细 GET /system/config/${userId} */
export async function getConfig(userId?: number | string, options?: Record<string, any>) {
  return request<ConfigInfo>('/system/config/' + parseStrEmpty(userId), {
    method: 'GET',
    ...(options || {}),
  });
}

/** 根据参数键名查询参数值 GET system/config/configKey */
export async function configKey(key?: string) {
  return request<any>('/system/config/configKey/' + key, {
    method: 'GET',
  });
}

/** 刷新缓存 DELETE /system/config/refreshCache */
export async function refreshCache() {
  return request<DictInfo>('/system/config/refreshCache', {
    method: 'DELETE',
  });
}
