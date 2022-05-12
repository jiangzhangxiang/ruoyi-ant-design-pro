export type DictListItem = {
  dictId?: number;
  status?: '0' | '1' | '2';
  createTime?: string;
  dictType?: string;
  code?: number;
};

export type DictList = {
  rows: DictListItem[];
  total: number;
  code: number;
};

export type DictDataListItem = {
  dictCode?: string | number;
  createTime?: string;
};

export type DictDataList = {
  rows: DictDataListItem[];
  total: number;
  code: number;
};

export type DictInfo = {
  data?: DictListItem;
};
