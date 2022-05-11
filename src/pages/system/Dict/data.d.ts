export type DictListItem = {
  dictId?: number;
  status?: '0' | '1' | '2';
  createTime?: string;
};

export type DictList = {
  rows?: DictListItem[];
  total?: number;
};

export type DictInfo = {};
