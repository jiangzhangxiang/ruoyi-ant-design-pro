import { request } from 'umi';
import { DeptList, DeptListItem, DeptInfo } from '@/pages/system/Dept/data';

/** 获取部门管理列表 GET /system/dept/list */
export async function list(
  params?: {
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<DeptList>('/system/dept/list', {
    method: 'GET',
    params: params,
    ...(options || {}),
  });
}
/** 修改部门 PUT /system/dept */
export async function updateDept(data: DeptListItem, options?: { [key: string]: any }) {
  return request<DeptListItem>('/system/dept', {
    method: 'PUT',
    data,
    ...(options || {}),
  });
}

/** 新建部门 POST /system/dept */
export async function addDept(data: DeptListItem, options?: { [key: string]: any }) {
  return request<DeptListItem>('/system/dept', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

/** 删除部门 DELETE /system/dept/ */
export async function delDept(id?: number[] | number) {
  return request<Record<string, any>>('/system/dept/' + id, {
    method: 'DELETE',
  });
}

/** 查询部门详细 GET /system/dept/${deptId} */
export async function getDept(deptId: number | undefined, options?: { [key: string]: any }) {
  return request<DeptInfo>('/system/dept/' + deptId, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 查询部门列表 （排除节点） GET /system/dept/list/exclude/${deptId} */
export async function listDeptExcludeChild(
  deptId: number | undefined,
  options?: { [key: string]: any },
) {
  return request<DeptList>('/system/dept/list/exclude/' + deptId, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 查询部门下拉树结构 GET /system/dept/treeselect*/
export async function treeselect() {
  return request<DeptList>('/system/dept/treeselect', {
    method: 'GET',
  });
}
