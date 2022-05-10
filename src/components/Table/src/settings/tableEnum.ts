/**
 * @description: 请求结果集 对应服务端字段
 */

export const tableSettings = {
  pagination: {
    // 默认分页数量
    defaultPageSize: 10,
    // 可切换每页数量集合
    pageSizeOptions: ['10', '20', '50', '100'],
  },
  request: {
    // 当前页的字段名
    pageField: 'pageNum',
    // 每页数量字段名
    sizeField: 'pageSize',
  },
  response: {
    // 接口返回的数据字段名-分页
    pagingListField: 'rows',
    // 接口返回的数据字段名-不分页
    listField: 'data',
    // 接口返回总页数字段名
    totalField: 'total',
  },
};

export const PAGESIZES = tableSettings.pagination;

export const REQUEST = tableSettings.request;

export const RESPONSE = tableSettings.response;
