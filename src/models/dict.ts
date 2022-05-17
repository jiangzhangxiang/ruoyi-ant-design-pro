import { Reducer } from 'react';
import { Effect } from '@@/plugin-dva/connect';
import { getConfig } from '@/services/ant-design-pro/system/config';

export interface DictModelState {
  dictMap: any;
}

export interface DictModeType {
  state: DictModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    saveDict: Reducer<DictModelState, any>;
  };
}

const DictModel: DictModeType = {
  state: {
    dictMap: {},
  },

  effects: {
    *query({ payload }, { call, put }) {
      const res = yield call(() => Promise.all(payload.map((m: string) => getConfig(m))));
      yield put({
        type: 'saveDict',
        payload: res,
      });
    },
  },
  reducers: {
    saveDict(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default DictModel;
