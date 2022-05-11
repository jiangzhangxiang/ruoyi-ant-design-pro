export type DictListItem = {
  dictId?: number;
  status?: '0' | '1' | '2';
  createTime?: string;
  dictType?: string;
  code?: number;
  dictCode?: string | number;
};

export type DictList = {
  rows: DictListItem[];
  total: number;
  code: number;
};

export type DictInfo = {
  data?: DictListItem;
};
