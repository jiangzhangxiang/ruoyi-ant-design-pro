import { request } from 'umi';
import { PostInfo, PostList, PostListItem } from '@/pages/system/Post/data';
import { parseStrEmpty } from '@/utils';

/** 获取岗位管理列表 GET /system/post/list */
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
  return request<PostList>('/api/system/post/list', {
    method: 'GET',
    params: params,
    ...(options || {}),
  });
}

/** 修改岗位 PUT /system/post */
export async function updatePost(data: PostListItem, options?: { [key: string]: any }) {
  return request<PostListItem>('/api/system/post', {
    method: 'PUT',
    data,
    ...(options || {}),
  });
}

/** 新建岗位 POST /system/post */
export async function addpost(data: PostListItem, options?: { [key: string]: any }) {
  return request<PostListItem>('/api/system/post', {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

/** 删除岗位 DELETE /system/post/ */
export async function delPost(postId?: number[] | number) {
  return request<Record<string, any>>('/api/system/post/' + postId, {
    method: 'DELETE',
  });
}

/** 查询岗位详细 PUT /system/post/${postId} */
export async function getpost(postId: number | undefined, options?: { [key: string]: any }) {
  return request<PostInfo>('/api/system/post/' + parseStrEmpty(postId), {
    method: 'GET',
    ...(options || {}),
  });
}
