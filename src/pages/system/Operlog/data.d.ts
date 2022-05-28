export type PostListItem = {
  postId?: number;
  status?: '0' | '1' | '2';
  userName?: string;
  createTime?: string;
};

export type PostList = {
  rows?: PostListItem[];
  total?: number;
};
