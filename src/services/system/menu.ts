import { request } from 'umi';
import { MenuInfo, MenuList, MenuListItem } from '@/pages/system/Menu/data';
import { parseStrEmpty } from '@/utils';
import { RoleInfo } from '@/pages/system/Role/data';

/** 获取客户管理列表 GET /system/menu/list */
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
  return request<MenuList>('/system/menu/list', {
    method: 'GET',
    params: params,
    ...(options || {}),
  });
}

/** 修改菜单 PUT /system/menu */
export async function updateMenu(data: MenuListItem, options?: { [key: string]: any }) {
  return request<MenuListItem>('/system/menu', {
    method: 'PUT',
    data,
    ...(options || {}),
  });
}

/** 新建菜单 POST /system/menu */
export async function addMenu(data: MenuListItem, options?: { [key: string]: any }) {
  return request<MenuListItem>('/system/menu', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

/** 删除菜单 DELETE /system/menu/ */
export async function delMenu(menuId?: number[] | number) {
  return request<Record<string, any>>('/system/menu/' + menuId, {
    method: 'DELETE',
  });
}

/** 查询菜单详细 PUT /system/menu/${menuId} */
export async function getMenu(menuId: number | undefined, options?: { [key: string]: any }) {
  return request<MenuInfo>('/system/menu/' + parseStrEmpty(menuId), {
    method: 'GET',
    ...(options || {}),
  });
}

/** 查询角色详细 PUT /system/menu/roleMenuTreeselect/${roleId} */
export async function roleMenuTreeselect(
  roleId: number | undefined,
  options?: { [key: string]: any },
) {
  return request<RoleInfo>('/system/menu/roleMenuTreeselect/' + parseStrEmpty(roleId), {
    method: 'GET',
    ...(options || {}),
  });
}

/** 查询菜单下拉树结构  PUT /system/menu/treeselect */
export async function treeselect(options?: { [key: string]: any }) {
  return request<RoleInfo>('/system/menu/treeselect', {
    method: 'GET',
    ...(options || {}),
  });
}
