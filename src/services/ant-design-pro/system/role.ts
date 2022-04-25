import { request } from 'umi';
import { UserList } from '@/pages/system/User/data';

/** 获取角色管理列表 GET /system/role/list */
export async function list(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<UserList>('/api/system/role/list', {
    method: 'GET',
    params: params,
    ...(options || {}),
  });
}
