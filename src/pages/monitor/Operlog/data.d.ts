export type OperlogListItem = {
  operId?: number;
  status?: '0' | '1' | '2';
  userName?: string;
  operTime?: string;
};

export type OperlogList = {
  rows?: OperlogListItem[];
  total?: number;
};
