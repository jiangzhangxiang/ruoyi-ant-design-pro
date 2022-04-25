export type RoleListItem = {
  roleId?: number;
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

export type RoleList = {
  rows?: RoleListItem[];
  total?: number;
};

export type RoleInfo = {
  code: number;
  posts: any[];
  roles: any[];
  postIds: any[];
  roleIds: any[];
};
