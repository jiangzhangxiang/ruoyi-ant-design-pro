import { request } from 'umi';
import { OperlogList } from '@/pages/monitor/Operlog/data';

/** 获取操作日志管理列表 **/
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
  return request<OperlogList>('/monitor/operlog/list', {
    method: 'GET',
    params: params,
    ...(options || {}),
  });
}

/** 删除操作日志 **/
export async function delOperlog(operlogId?: number[] | number) {
  return request<Record<string, any>>('/monitor/operlog/' + operlogId, {
    method: 'DELETE',
  });
}

/** 清空操作日志 **/
export async function clearOperlog() {
  return request<Record<string, any>>('/monitor/operlog/clean', {
    method: 'DELETE',
  });
}
