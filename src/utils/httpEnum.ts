/**
 * @description: 请求结果集 对应服务端字段
 */
export enum TableResponseEnum {
  // 当前页的字段名
  pageField = 'pageNum',
  // 每页数量字段名
  sizeField = 'pageSize',
  // 接口返回的数据字段名
  listField = 'rows',
  // 接口返回总页数字段名
  totalField = 'total',
}
