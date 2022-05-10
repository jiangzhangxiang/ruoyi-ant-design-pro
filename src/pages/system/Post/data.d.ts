export type PostListItem = {
  postId?: number;
  nickName?: string;
  password?: string;
  postIds?: any[];
  roleIds?: any[];
  status?: '0' | '1' | '2';
  userName?: string;
  createTime?: string;
  dept?: {
    deptName?: string;
  };
};

export type PostList = {
  rows?: PostListItem[];
  total?: number;
};
