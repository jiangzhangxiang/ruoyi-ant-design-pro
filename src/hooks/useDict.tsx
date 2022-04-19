import { useState, useEffect } from 'react';
import { getDicts } from '@/services/ant-design-pro/system/config';

type useDictType = {
  dictType: string[];
  transform?: (arr: any[]) => any[];
  isRequest?: boolean;
};

type dictItem = {
  createBy: string;
  createTime: string;
  cssClass: string;
  default: boolean;
  dictCode: number;
  dictLabel: string;
  dictSort: number;
  dictType: string;
  dictValue: string;
  isDefault: string;
  listClass: string;
  params: unknown;
  remark: string;
  searchValue: null | string;
  status: string;
  updateBy: null | string;
  updateTime: null | string;
};

/**
 * 初始化 返回数据格式
 * @param dictType
 */
const initDataSource = (dictType: string[]) => {
  const o = {};
  dictType.forEach((f) => {
    o[f] = { options: [], valueEnum: [] };
  });
  return o;
};

/**
 * 默认的字典处理方法 - 遍历处理每一项
 * @param arr
 */
const dict_transform = (arr: dictItem[]) => {
  const valueEnum = {};
  const list = arr.map((m) => {
    valueEnum[m.dictValue] = m.dictLabel;
    return { value: m.dictValue, label: m.dictLabel };
  });
  return {
    options: list,
    valueEnum,
  };
};

export default function useDict({ dictType, transform }: useDictType) {
  const [dataSource, setDataSource] = useState<any>(initDataSource(dictType));
  const initSelect = async () => {
    const data = {};
    const res = await Promise.all(dictType.map((m: string) => getDicts(m)));
    dictType.forEach((k, i) => {
      data[k] = transform ? transform(res[i].data) : dict_transform(res[i].data);
    });
    setDataSource(data);
  };
  useEffect(() => {
    initSelect().then();
  }, []);
  return dataSource;
}
