import { request } from 'umi';
import { DictDataList, DictDataListItem } from '@/pages/system/Dict/data';

/** 获取字典数据管理列表 **/
export async function listData(
  params?: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<DictDataList>('/system/dict/data/list', {
    method: 'GET',
    params: params,
    ...(options || {}),
  });
}
/** 修改字典数据 **/
export async function updateDictData(data: DictDataListItem, options?: { [key: string]: any }) {
  return request<DictDataListItem>('/system/dict/data', {
    method: 'PUT',
    data,
    ...(options || {}),
  });
}

/** 新建字典数据 **/
export async function addDictData(
  data: { dictCode?: string | number },
  options?: { [p: string]: any },
) {
  return request<DictDataListItem>('/system/dict/data', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

/** 删除字典数据**/
export async function delDictData(id?: number[] | number) {
  return request<Record<string, any>>('/system/dict/data/' + id, {
    method: 'DELETE',
  });
}

/** 查询字典数据 **/
export async function getDicts(dictType?: string) {
  return request<any>('/system/dict/data/type/' + dictType, {
    method: 'GET',
  });
}
