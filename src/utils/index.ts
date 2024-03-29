import { parse } from 'querystring';

const reg =
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

/**
 * 判断 对象 params 里是符合 mapList 的规则
 * @mapList: [[{status: 1, type: 2}, callBack], ...] 二维数组 用于new Map 操作
 * @param: { status: 1, type, 2 } 需要判断的对象
 */
export const judgeMap = (mapList: any[], params: Record<string, any>) => {
  const action = [...new Map(mapList)].filter(([mapKey]: any[]) =>
    Object.keys(mapKey).every((k) => mapKey[k].includes(params[k])),
  );
  return action; // 所有符合条件的 结果数组
};

/**
 * 通用js方法封装处理
 * Copyright (c) 2019 ruoyi
 */

// 日期格式化
export function parseTime(paramsItem: string | number | Date, pattern: string) {
  let time = paramsItem;
  if (arguments.length === 0 || !time) {
    return null;
  }
  const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time);
    } else if (typeof time === 'string') {
      time = time
        .replace(new RegExp(/-/gm), '/')
        .replace('T', ' ')
        .replace(new RegExp(/\.[\d]{3}/gm), '');
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result: string, key: string) => {
    let value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value];
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }
    return value || 0;
  });
  return time_str;
}
/**
 * 本地localStorage存数据 方法
 */
export const ls = {
  // key 存储的标识 days 有效时间（天） value 存储的值
  setItem(key: string, value: any, days: number = 7) {
    const Days = days || 7; // 有效时间默认7天
    const exp = new Date();
    const expires = exp.getTime() + Days * 24 * 60 * 60 * 1000;
    localStorage.setItem(
      key,
      JSON.stringify({
        value,
        expires,
      }),
    );
  },
  getItem(key: string) {
    const o = JSON.parse(<string>localStorage.getItem(key));
    if (!o || o.expires < Date.now()) {
      return null;
    }
    return o.value;
  },
  removeItem(key: string) {
    localStorage.removeItem(key);
  },
};

/**
 * get请求映射params参数
 * @param {*} params  参数
 */
export function tansParams(params: Record<string, any>) {
  let result = '';
  for (const propName of Object.keys(params)) {
    const value = params[propName];
    const part = encodeURIComponent(propName) + '=';
    if (value !== null && typeof value !== 'undefined') {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && typeof value[key] !== 'undefined') {
            const subPart = encodeURIComponent(propName + '[' + key + ']') + '=';
            result += subPart + encodeURIComponent(value[key]) + '&';
          }
        }
      } else {
        result += part + encodeURIComponent(value) + '&';
      }
    }
  }
  return result;
}

// 验证是否为blob格式
export async function blobValidate(data: any) {
  try {
    const text = await data.text();
    JSON.parse(text);
    return false;
  } catch (error) {
    return true;
  }
}

/**
 * 转换字符串，undefined,null等转化为""
 * @param str
 */
export function parseStrEmpty(str?: string | number) {
  if (!str || str == 'undefined' || str == 'null') {
    return '';
  }
  return str;
}

/**
 * 添加日期范围
 * dateRange 日期数组
 * propName 字段名拼接
 */
export function addDateRange(dateRange: any[] = [], propName?: string) {
  const obj: any = {
    params: {},
  };
  if (typeof propName === 'undefined') {
    obj.params.beginTime = dateRange[0];
    obj.params.endTime = dateRange[1];
  } else {
    obj.params['begin' + propName] = dateRange[0];
    obj.params['end' + propName] = dateRange[1];
  }
  return obj;
}

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 */
export function handleTree(data: any[], id?: string, parentId?: string, children?: string) {
  const config = {
    id: id || 'id',
    parentId: parentId || 'parentId',
    childrenList: children || 'children',
  };

  const childrenListMap = {};
  const nodeIds = {};
  const tree = [];

  for (const d of data) {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const parentId: any = d[config.parentId];
    if (childrenListMap[parentId] == null) {
      childrenListMap[parentId] = [];
    }
    nodeIds[d[config.id]] = d;
    childrenListMap[parentId].push(d);
  }

  for (const d of data) {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const parentId: any = d[config.parentId];
    if (nodeIds[parentId] == null) {
      tree.push(d);
    }
  }

  for (const t of tree) {
    adaptToChildrenList(t);
  }

  function adaptToChildrenList(o: Record<string, any>) {
    if (childrenListMap[o[config.id]] !== null) {
      o[config.childrenList] = childrenListMap[o[config.id]];
    }
    if (o[config.childrenList]) {
      for (const c of o[config.childrenList]) {
        adaptToChildrenList(c);
      }
    }
  }
  return tree;
}
