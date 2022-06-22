import { useState, useEffect } from 'react';
import { getDicts } from '@/services/system/dict/data';

type DictConfigType = {
  value?: string;
  label?: string;
};
type UseDictType = {
  dictType: string[];
  transform?: (arr: DictConfigType[]) => void;
  isRequest?: boolean;
};

/**
 * 默认的字典处理方法 - 遍历处理每一项
 * @param arr
 * @param value
 * @param label
 */
export const dictTransform = (arr: DictConfigType[], value?: string, label?: string) => {
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

/**
 * 获取字典的hook
 */
export default function useDict({ dictType, transform }: UseDictType) {
  /**
   * 初始化 返回数据格式
   * @param t
   */
  const initDataSource = (t: string[]) => {
    const o = {};
    t.forEach((f) => {
      o[f] = { options: [], valueEnum: [] };
    });
    return o;
  };
  const [dataSource, setDataSource] = useState(initDataSource(dictType));
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
