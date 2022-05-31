export type RoleListItem = {
  userId?: number;
  createTime?: string;
  roleId?: number;
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
