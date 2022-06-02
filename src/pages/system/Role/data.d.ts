export type RoleListItem = {
  roleId?: number;
  createTime?: string;
  menuIds?: number[];
};

export type RoleList = {
  rows?: RoleListItem[];
  total?: number;
};

export type RoleInfo = {
  data?: {};
};
