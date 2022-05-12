export type ConfigListItem = {
  userId?: number;
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

export type ConfigList = {
  rows?: ConfigListItem[];
  total?: number;
};

export type ConfigInfo = {
  data: ConfigListItem[];
};
