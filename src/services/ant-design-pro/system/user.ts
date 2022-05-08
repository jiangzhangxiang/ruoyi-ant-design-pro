import { request } from 'umi';
import { UserInfo, UserList, UserListItem } from '@/pages/system/User/data';
import { parseStrEmpty } from '@/utils';

/** 获取客户管理列表 GET /system/user/list */
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
  return request<UserList>('/api/system/user/list', {
    method: 'GET',
    params: params,
    ...(options || {}),
  });
}

/** 修改用户 PUT /system/user */
export async function updateUser(data: UserListItem, options?: { [key: string]: any }) {
  return request<UserListItem>('/api/system/user', {
    method: 'PUT',
    data,
    ...(options || {}),
  });
}

/** 新建用户 POST /system/user */
export async function addUser(data: UserListItem, options?: { [key: string]: any }) {
  return request<UserListItem>('/api/system/user', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

/** 删除用户 DELETE /system/user/ */
export async function delUser(userId?: number[] | number) {
  return request<Record<string, any>>('/api/system/user/' + userId, {
    method: 'DELETE',
  });
}

/** 重置密码 POST /system/resetUserPwd */
export async function resetUserPwd(data: UserListItem, options?: { [key: string]: any }) {
  return request<UserListItem>('/api/system/user/resetPwd', {
    method: 'PUT',
    data,
    ...(options || {}),
  });
}

/** 查询用户详细 PUT /system/user/${userId} */
export async function getUser(userId: number | undefined, options?: { [key: string]: any }) {
  return request<UserInfo>('/api/system/user/' + parseStrEmpty(userId), {
    method: 'GET',
    ...(options || {}),
  });
}

/** 导入用户 POST /system/user/importData */
export async function importData(data: any, options?: { [key: string]: any }) {
  const url = '/api/system/user/importData' + '?updateSupport=' + data.updateSupport;
  return request<UserInfo>(url, {
    method: 'POST',
    data: data.formData,
    errorMessageMode: 'modal',
    ...(options || {}),
  });
}
