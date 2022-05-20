// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    userName?: string;
    avatar?: string;
    unreadCount?: number;
    access?: 'admin';
  };

  type LoginResult = {
    token?: string;
    code?: number;
    msg?: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type FakeCaptcha = {
    captchaOnOff: boolean;
    code?: number;
    img: string;
    msg?: string;
    uuid: string;
  };

  type LoginParams = {
    code: string;
    password: string;
    username: string;
    uuid: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };
  type FileType = {
    msg?: string;
    fileName?: string;
    code?: number;
    newFileName?: string;
    url?: string;
    originalFilename?: string;
  };
  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
