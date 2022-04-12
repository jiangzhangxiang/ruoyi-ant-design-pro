/**
 * 封装 ant-design/pro-table
 * 添加全局默认配置 方便修改
 */

import type { ParamsType } from '@ant-design/pro-provider';
import type { ProTableProps } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
type TableProps<T, U extends ParamsType = {}> = ProTableProps<T, U>;
function Table<T, U extends Record<string, any> = {}>(props: Omit<TableProps<T, U>, ''>) {
  const { search, pagination = {}, scroll, id, className, ...restProps } = props;
  return (
    <div id={id}>
      <ProTable<T, U>
        rowKey="id"
        pagination={
          pagination === false
            ? false
            : {
                defaultPageSize: 10,
                pageSizeOptions: ['10', '20', '50', '100', '200', '400', '500'],
                ...(pagination ?? {}),
              }
        }
        {...restProps}
      />
    </div>
  );
}

export default Table;
