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
 * 本地存数据
 */

export const ls = {
  // days 有效时间（天）
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
 * 参数处理
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

// 转换字符串，undefined,null等转化为""
export function parseStrEmpty(str: any) {
  if (!str || str == 'undefined' || str == 'null') {
    return '';
  }
  return str;
}
