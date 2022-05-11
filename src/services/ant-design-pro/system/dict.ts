import { request } from 'umi';
import { DictList, DictListItem, DictInfo } from '@/pages/system/Dict/data';

/** 获取字典管理列表 GET /system/dict/list */
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
  return request<DictList>('/api/system/dict/type/list', {
    method: 'GET',
    params: params,
    ...(options || {}),
  });
}
/** 修改字典 PUT /system/dict */
export async function updateDict(data: DictListItem, options?: { [key: string]: any }) {
  return request<DictListItem>('/api/system/dict', {
    method: 'PUT',
    data,
    ...(options || {}),
  });
}

/** 新建字典 POST /system/dict */
export async function addDict(data: DictListItem, options?: { [key: string]: any }) {
  return request<DictListItem>('/api/system/dict', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

/** 删除字典 DELETE /system/dict/ */
export async function delDict(id?: number[] | number) {
  return request<Record<string, any>>('/api/system/dict/' + id, {
    method: 'DELETE',
  });
}

/** 查询字典详细 PUT /system/dict/${dictId} */
export async function getDict(dictId: number | undefined, options?: { [key: string]: any }) {
  return request<DictInfo>('/api/system/dict/' + dictId, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 查询刷新 DELETE /system/dict/type/refreshCache */
export async function refreshCache() {
  return request<DictInfo>('/api/system/dict/type/refreshCache', {
    method: 'DELETE',
  });
}
