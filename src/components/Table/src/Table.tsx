/**
 * 封装 ant-design/pro-table
 * 添加全局默认配置 方便修改
 */

import type { ParamsType } from '@ant-design/pro-provider';
import type { ProTableProps } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { PAGESIZES, REQUEST, RESPONSE } from '@/components/Table/src/settings/tableEnum';
type TableProps<T, U extends ParamsType = {}> = ProTableProps<T, U>;
function Table<T, U extends Record<string, any> = {}>(
  props: Omit<TableProps<T, U>, ''> & {
    // 需要对请求数据进行处理
    request?: any;
  },
) {
  const { search, pagination = {}, scroll, id, className, request, rowKey, ...restProps } = props;
  return (
    <div id={id}>
      <ProTable<T, U>
        rowKey={rowKey}
        request={async (params) => {
          const transformParams = {
            ...params,
            [REQUEST.pageField]: params.current,
            [REQUEST.sizeField]: params.pageSize,
          };
          return request(transformParams).then((res: any) => {
            return {
              ...res,
              // 先找分页的数据字段，再找不分页的数据字段-如果有改变 可以直接 修改 tableSettings
              data: res[RESPONSE.listField] || res[RESPONSE.pagingListField],
              total: res[RESPONSE.totalField],
            };
          });
        }}
        pagination={
          pagination === false
            ? false
            : {
                defaultPageSize: PAGESIZES.defaultPageSize,
                pageSizeOptions: PAGESIZES.pageSizeOptions,
                ...(pagination ?? {}),
              }
        }
        {...restProps}
      />
    </div>
  );
}

export default Table;
