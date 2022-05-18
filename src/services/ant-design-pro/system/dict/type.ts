import { request } from 'umi';
import { DictList, DictListItem, DictInfo } from '@/pages/system/Dict/data';

/** 获取字典类型管理列表 GET /system/dict/type/list */
export async function list(
  params?: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<DictList>('/system/dict/type/list', {
    method: 'GET',
    params: params,
    ...(options || {}),
  });
}
/** 修改字典类型 PUT /system/dict/type */
export async function updateDict(data: DictListItem, options?: { [key: string]: any }) {
  return request<DictListItem>('/system/dict/type', {
    method: 'PUT',
    data,
    ...(options || {}),
  });
}

/** 新建字典类型 POST /system/dict/type */
export async function addDict(data: DictListItem, options?: { [key: string]: any }) {
  return request<DictListItem>('/system/dict/type', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

/** 删除字典类型 DELETE /system/dict/type/${dictId} */
export async function delDict(dictId?: number[] | number) {
  return request<Record<string, any>>('/system/dict/type/' + dictId, {
    method: 'DELETE',
  });
}

/** 查询字典类型详细 PUT /system/dict/${dictId} */
export async function getDict(dictId: number | undefined, options?: { [key: string]: any }) {
  return request<DictInfo>('/system/dict/type/' + dictId, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 刷新缓存 DELETE /system/dict/type/refreshCache */
export async function refreshCache() {
  return request<DictInfo>('/system/dict/type/refreshCache', {
    method: 'DELETE',
  });
}
