import { request } from 'umi';
import { OnlineList } from '@/pages/monitor/Online/data';

/** 获取在线用户列表 **/
export async function list(
  params: {
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<OnlineList>('/monitor/online/list', {
    method: 'GET',
    params: params,
    ...(options || {}),
  });
}

/** 强退在线用户 **/
export async function delOnline(onlineId: string) {
  return request<Record<string, any>>('/monitor/online/' + onlineId, {
    method: 'DELETE',
  });
}
