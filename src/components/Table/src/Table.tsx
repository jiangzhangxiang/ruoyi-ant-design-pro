/**
 * 封装 ant-design/pro-table
 * 添加全局默认配置 方便修改
 */
/**
 * 封装 ant-design/pro-table
 * 添加全局默认配置 方便修改
 */

import type { ProTableProps } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { PAGESIZES, REQUEST, RESPONSE } from '@/components/Table/src/settings/tableEnum';

export default function <T, U>(
  props: Omit<ProTableProps<T, U>, ''> & {
    // 需要对请求数据进行处理
    request?: any;
  },
) {
  const { pagination = {}, request, ...restProps } = props;
  return (
    <ProTable<T, U>
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
  );
}
