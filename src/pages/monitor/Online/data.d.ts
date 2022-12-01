export type OnlineListItem = {
  tokenId: string;
  loginTime: string;
  userName: string;
};

export type OnlineList = {
  rows?: OnlineListItem[];
  total?: number;
};
