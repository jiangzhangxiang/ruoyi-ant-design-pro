export type RoleListItem = {
  roleId?: number;
  createTime?: string;
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
