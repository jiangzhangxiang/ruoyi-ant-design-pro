export type DeptListItem = {
  deptId?: number;
};

export type DeptList = {
  data: DeptListItem[];
  total?: number;
};

export type DeptInfo = {
  data: DeptListItem[];
};
