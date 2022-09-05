/**
 * 封装 可拖动的列宽的表格
 * 在组件这一层拦截掉冲突的属性
 */
import type { ProTableProps } from '@ant-design/pro-table';
import { BasicTable } from '@/components/Table';
import { useState } from 'react';
import { Resizable } from 'react-resizable';
import styles from './styles.less';
import classnames from 'classnames';

// 重写表头
const ResizableTitle = (props: any) => {
  const { onResize, width, ...restProps } = props;

  // 添加偏移量
  const [offset, setOffset] = useState(0);

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      // 宽度重新计算结果，表头应当加上偏移量，这样拖拽结束的时候能够计算结果；
      // 当然在停止事件再计算应当一样，我没试过（笑）
      width={width + offset}
      height={0}
      handle={
        <span
          // 有偏移量显示竖线
          className={classnames(['react-resizable-handle', offset && 'active'])}
          // 拖拽层偏移
          style={{ transform: `translateX(${offset}px)` }}
          onClick={(e) => {
            // 取消冒泡，不取消貌似容易触发排序事件
            e.stopPropagation();
            e.preventDefault();
          }}
        />
      }
      // 拖拽事件实时更新
      onResize={(e, { size }) => {
        // 这里只更新偏移量，数据列表其实并没有伸缩
        setOffset(size.width - width);
      }}
      // 拖拽结束更新
      onResizeStop={(...argu) => {
        // 拖拽结束以后偏移量归零
        setOffset(0);
        // 这里是props传进来的事件，在外部是列数据中的onHeaderCell方法提供的事件，请自行研究官方提供的案例
        onResize(...argu);
      }}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
};
export default function <T, U>(
  props: Omit<ProTableProps<T, U>, ''> & {
    // 需要对请求数据进行处理
  },
) {
  const { id, columns, ...restProps } = props;
  const [column, setColumn] = useState<any[]>(columns || []);
  const components = {
    header: {
      cell: ResizableTitle,
    },
  };
  const tableColumns = column.map((col, index) => ({
    ...col,
    onHeaderCell: (cell: any) => ({
      width: cell.width,
      onResize: (e: any, { size }: any) => {
        setColumn(() => {
          const nextColumn = [...column];
          nextColumn[index] = {
            ...nextColumn[index],
            width: size.width,
          };
          return nextColumn;
        });
      },
    }),
  }));

  return (
    <div className={styles.table}>
      <BasicTable {...restProps} components={components} id={id} columns={tableColumns} />
    </div>
  );
}
