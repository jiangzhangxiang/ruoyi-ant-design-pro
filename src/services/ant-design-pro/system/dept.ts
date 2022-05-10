import { request } from 'umi';
import { DeptList, DeptListItem } from '@/pages/system/Dept/data';
import { UserInfo } from '@/pages/system/User/data';
import { parseStrEmpty } from '@/utils';

/** 获取部门管理列表 GET /system/dept/list */
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
  return request<DeptList>('/api/system/dept/list', {
    method: 'GET',
    params: params,
    ...(options || {}),
  });
}
/** 修改部门 PUT /system/dept */
export async function updateDept(data: DeptListItem, options?: { [key: string]: any }) {
  return request<DeptListItem>('/api/system/dept', {
    method: 'PUT',
    data,
    ...(options || {}),
  });
}

/** 新建部门 POST /system/dept */
export async function addDept(data: DeptListItem, options?: { [key: string]: any }) {
  return request<DeptListItem>('/api/system/dept', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

/** 删除部门 DELETE /system/dept/ */
export async function delDept(id?: number[] | number) {
  return request<Record<string, any>>('/api/system/dept/' + id, {
    method: 'DELETE',
  });
}
/** 查询用户详细 PUT /system/dept/${deptId} */
export async function getDept(deptId: number | undefined, options?: { [key: string]: any }) {
  return request<UserInfo>('/api/system/dept/' + parseStrEmpty(deptId), {
    method: 'GET',
    ...(options || {}),
  });
}

/** 查询部门下拉树结构 GET /system/dept/treeselect*/
export async function treeselect() {
  return request<DeptList>('/api/system/dept/treeselect', {
    method: 'GET',
  });
}
