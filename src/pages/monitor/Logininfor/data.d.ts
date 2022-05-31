export type OperlogListItem = {
  infoId?: number;
  status?: '0' | '1' | '2';
  userName?: string;
  loginTime?: string;
};

export type OperlogList = {
  rows?: OperlogListItem[];
  total?: number;
};
