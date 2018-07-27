import { AnyAction } from 'redux';

// Action Type
export const types = {
  CHANGE_ACTIVE: 'layout/CHANGE_ACTIVE',
  CLEAR_NOTICE: 'layout/CLEAR_NOTICE',
  COLLAPSE: 'layout/COLLAPSE',
};

// Action Creators
export const actions = {
  /**
   * 改變sidebar所在的位置
   * @param current - 現在的位置
   */
  changeActive(current: string) {
    return {
      type: types.CHANGE_ACTIVE,
      current,
    };
  },

  /**
   * 摺疊sidebar
   * @param collapsed - 是否摺疊
   */
  collapse(collapsed: boolean) {
    return {
      type: types.COLLAPSE,
      collapsed,
    };
  },

  /**
   * 清空通知訊息
   * @param noticeType - 類型 notice/message/todo
   */
  clearNotice(noticeType: string) {
    return {
      type: types.CLEAR_NOTICE,
      noticeType,
    };
  },
};

export interface IStoreState {
  collapsed: boolean;
  notice: any[];
  sider: {
    current: string;
  };
};

const initialState = {
  collapsed: false,
  notice: [],
  sider: {
    current: 'home',
  },
};

// reducer
export default (
  state: IStoreState = initialState,
  action: AnyAction,
): IStoreState => {
  switch (action.type) {
    case types.CHANGE_ACTIVE:
      return {
        ...state,
        sider: {
          ...state.sider,
          current: action.current,
        },
      };

    case types.COLLAPSE:
      return {
        ...state,
        collapsed: action.collapsed,
      };

    case types.CLEAR_NOTICE:
      return {
        ...state,
        notice: state.notice.filter(item => item.type !== action.noticeType),
      };

    default:
      return state;
  }
};
