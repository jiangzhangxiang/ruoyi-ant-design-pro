export type MenuListItem = {
  menuId?: number;
  createTime?: string;
};

export type MenuList = {
  rows?: MenuListItem[];
  total?: number;
};

export type MenuInfo = {
  code: number;
  data?: any[];
};
