import { request } from 'umi';
import type { ConfigInfo, ConfigList, ConfigListItem } from '@/pages/system/Notice/data';
import { parseStrEmpty } from '@/utils';

/** 获取通知公告列表 GET /system/notice/list */
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
  return request<ConfigList>('/api/system/notice/list', {
    method: 'GET',
    params: params,
    ...(options || {}),
  });
}

/** 修改通知公告 PUT /system/notice */
export async function updateConfig(data: ConfigListItem, options?: Record<string, any>) {
  return request<ConfigListItem>('/api/system/notice', {
    method: 'PUT',
    data,
    ...(options || {}),
  });
}

/** 新建通知公告 POST /system/notice */
export async function addConfig(data: ConfigListItem, options?: Record<string, any>) {
  return request<ConfigListItem>('/api/system/notice', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

/** 删除通知公告 DELETE /system/notice/ */
export async function delConfig(noticeId?: number[] | number) {
  return request<Record<string, any>>('/api/system/notice/' + noticeId, {
    method: 'DELETE',
  });
}

/** 查询通知公告详细 PUT /system/notice/${noticeId} */
export async function getNotice(noticeId?: number | string, options?: Record<string, any>) {
  return request<ConfigInfo>('/api/system/notice/' + parseStrEmpty(noticeId), {
    method: 'GET',
    ...(options || {}),
  });
}
