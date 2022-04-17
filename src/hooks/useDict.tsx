import { useState, useEffect } from 'react';
import { getDicts } from '@/services/ant-design-pro/system/config';

type useDictType = {
  dictType: string[];
  transform?: (arr: any[]) => any[];
};

export default function useDict({ dictType, transform }: useDictType) {
  const dict_transform = (arr: any[]) => {
    return arr;
  };
  const [dataSource, setDataSource] = useState<any>({});
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
