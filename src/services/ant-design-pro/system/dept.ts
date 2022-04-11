import { request } from 'umi';
import { DeptList } from '@/pages/system/Dept/data.d';

/** 查询部门下拉树结构 GET /system/dept/treeselect*/
export async function treeselect() {
  return request<DeptList>('/api/system/dept/treeselect', {
    method: 'GET',
  });
}
