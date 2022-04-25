import { request } from 'umi';
import type { RoleList, RoleListItem } from '@/pages/system/Role/data';

/** 获取角色管理列表 GET /system/role/list */
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
  return request<RoleList>('/api/system/role/list', {
    method: 'GET',
    params: params,
    ...(options || {}),
  });
}

/** 修改角色 PUT /system/user */
export async function updateUser(data: RoleListItem, options?: Record<string, any>) {
  return request<RoleListItem>('/api/system/role', {
    method: 'PUT',
    data,
    ...(options || {}),
  });
}

/** 新建角色 POST /system/user */
export async function addUser(data: RoleListItem, options?: Record<string, any>) {
  return request<RoleListItem>('/api/system/role', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

/** 删除角色 DELETE /system/user/ */
export async function delUser(userId?: number[] | number) {
  return request<Record<string, any>>('/api/system/role/' + userId, {
    method: 'DELETE',
  });
}
