export type UserListItem = {
  userId?: number;
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

export type DeptList = {
  rows?: UserListItem[];
  total?: number;
};
