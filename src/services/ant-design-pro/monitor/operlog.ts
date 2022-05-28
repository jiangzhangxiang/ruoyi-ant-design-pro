import { request } from 'umi';
import { OperlogList } from '@/pages/system/Operlog/data';

/** 获取登录日志管理列表 GET /monitor/operlog/list */
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

/** 删除登录日志 DELETE /monitor/operlog/ */
export async function delOperlog(operlogId?: number[] | number) {
  return request<Record<string, any>>('/monitor/operlog/' + operlogId, {
    method: 'DELETE',
  });
}

/** 清空登录日志 DELETE /monitor/operlog/ */
export async function clearOperlog() {
  return request<Record<string, any>>('/monitor/operlog/clean', {
    method: 'DELETE',
  });
}
