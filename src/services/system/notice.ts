import { request } from 'umi';
import type { NoticeInfo, NoticeList, NoticeListItem } from '@/pages/system/Notice/data';
import { parseStrEmpty } from '@/utils';

/** 获取通知公告列表 GET /system/notice/list */
export async function list(
  params: {
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: Record<string, any>,
) {
  return request<NoticeList>('/system/notice/list', {
    method: 'GET',
    params: params,
    ...(options || {}),
  });
}

/** 修改通知公告 PUT /system/notice */
export async function updateNotice(data: NoticeListItem, options?: Record<string, any>) {
  return request<NoticeListItem>('/system/notice', {
    method: 'PUT',
    data,
    ...(options || {}),
  });
}

/** 新建通知公告 POST /system/notice */
export async function addNotice(data: NoticeListItem, options?: Record<string, any>) {
  return request<NoticeListItem>('/system/notice', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

/** 删除通知公告 DELETE /system/notice/ */
export async function delNotice(noticeId?: number[] | number) {
  return request<Record<string, any>>('/system/notice/' + noticeId, {
    method: 'DELETE',
  });
}

/** 查询通知公告详细 GET /system/notice/${noticeId} */
export async function getNotice(noticeId?: number | string, options?: Record<string, any>) {
  return request<NoticeInfo>('/system/notice/' + parseStrEmpty(noticeId), {
    method: 'GET',
    ...(options || {}),
  });
}
