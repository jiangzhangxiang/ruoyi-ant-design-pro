export type OperlogListItem = {
  operId?: number;
  status?: '0' | '1' | '2';
  userName?: string;
  createTime?: string;
};

export type OperlogList = {
  rows?: OperlogListItem[];
  total?: number;
};
