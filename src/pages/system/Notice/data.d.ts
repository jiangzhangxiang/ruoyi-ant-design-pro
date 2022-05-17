export type NoticeListItem = {
  noticeId?: number;
  status?: '0' | '1' | '2';
  createTime?: string;
};

export type NoticeList = {
  rows?: NoticeListItem[];
  total?: number;
};

export type NoticeInfo = {
  data: NoticeListItem[];
  msg: string;
};
