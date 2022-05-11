import { request } from 'umi';
import { DictList, DictListItem } from '@/pages/system/Dict/data';

/** 获取字典数据管理列表 GET /system/dict/list */
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
  return request<DictList>('/api/system/dict/data/list', {
    method: 'GET',
    params: params,
    ...(options || {}),
  });
}
/** 修改字典数据 PUT /system/dict */
export async function updateDict(data: DictListItem, options?: { [key: string]: any }) {
  return request<DictListItem>('/api/system/dict/data', {
    method: 'PUT',
    data,
    ...(options || {}),
  });
}

/** 新建字典数据 POST /system/dict */
export async function addDict(data: DictListItem, options?: { [key: string]: any }) {
  return request<DictListItem>('/api/system/dict/data', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

/** 删除字典数据 DELETE /system/dict/ */
export async function delDict(id?: number[] | number) {
  return request<Record<string, any>>('/api/system/dict/data/' + id, {
    method: 'DELETE',
  });
}
