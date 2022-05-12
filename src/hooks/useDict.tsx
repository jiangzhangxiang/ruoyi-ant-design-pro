import { useState, useEffect } from 'react';
import { getDicts } from '@/services/ant-design-pro/system/config';

type useDictType = {
  dictType: string[];
  transform?: (arr: any[]) => void;
  isRequest?: boolean;
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
 * @param value
 * @param label
 */
export const dictTransform = (arr: any[], value?: string, label?: string) => {
  const config = {
    value: value || 'dictValue',
    label: label || 'dictLabel',
  };
  const valueEnum = {};
  const list = arr.map((m) => {
    valueEnum[m[config.value]] = m[config.label];
    return { value: m[config.value], label: m[config.label] };
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
      data[k] = transform ? transform(res[i].data) : dictTransform(res[i].data);
    });
    setDataSource(data);
  };
  useEffect(() => {
    initSelect().then();
  }, []);
  return dataSource;
}
