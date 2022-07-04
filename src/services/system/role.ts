import { request } from 'umi';
import type { RoleList, RoleListItem } from '@/pages/system/Role/data';
import { parseStrEmpty } from '@/utils';
import { RoleInfo } from '@/pages/system/Role/data';

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
  return request<RoleList>('/system/role/list', {
    method: 'GET',
    params: params,
    ...(options || {}),
  });
}

/** 修改角色 PUT /system/user */
export async function updateRole(data: RoleListItem, options?: Record<string, any>) {
  return request<RoleListItem>('/system/role', {
    method: 'PUT',
    data,
    ...(options || {}),
  });
}

/** 新建角色 POST /system/user */
export async function addRole(data: RoleListItem, options?: Record<string, any>) {
  return request<RoleListItem>('/system/role', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

/** 删除角色 DELETE /system/user/ */
export async function delRole(userId?: number[] | number) {
  return request<Record<string, any>>('/system/role/' + userId, {
    method: 'DELETE',
  });
}

/** 查询角色详细 GET /system/role/${roleId} */
export async function getRole(roleId: number | undefined, options?: { [key: string]: any }) {
  return request<RoleInfo>('/system/role/' + parseStrEmpty(roleId), {
    method: 'GET',
    ...(options || {}),
  });
}
