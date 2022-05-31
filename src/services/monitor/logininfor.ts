import { request } from 'umi';
import { OperlogList } from '@/pages/monitor/Logininfor/data';

/** 获取登录日志管理列表 GET /monitor/logininfor/list */
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
  return request<OperlogList>('/monitor/logininfor/list', {
    method: 'GET',
    params: params,
    ...(options || {}),
  });
}

/** 删除登录日志 DELETE /monitor/logininfor/ */
export async function delOperlog(operlogId?: number[] | number) {
  return request<Record<string, any>>('/monitor/logininfor/' + operlogId, {
    method: 'DELETE',
  });
}

/** 清空登录日志 DELETE /monitor/logininfor/ */
export async function clearLogininfor() {
  return request<Record<string, any>>('/monitor/logininfor/clean', {
    method: 'DELETE',
  });
}
