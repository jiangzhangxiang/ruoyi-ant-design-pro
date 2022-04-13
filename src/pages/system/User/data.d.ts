export type UserListItem = {
  userId: number;
  nickName?: string;
  password?: string;
  postIds?: any[];
  roleIds?: any[];
  status?: '0' | '1' | '2';
  userName?: string;
  dept?: {
    deptName?: string;
  };
};

export type UserList = {
  rows?: UserListItem[];
  total?: number;
};

export type UserInfo = {
  code: number;
  posts: any[];
  roles: any[];
  postIds: any[];
  roleIds: any[];
};
