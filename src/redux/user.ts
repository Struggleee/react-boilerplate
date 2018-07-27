import auth from './../requests/auth';
import jwtDecode from 'jwt-decode';
import { AnyAction, Dispatch } from 'redux';
import { IClaims } from './../types';

// Action Type
export const types = {
  LOGIN: 'user/LOGIN',
  LOGOUT: 'user/LOGOUT',
  SET_ROLES: 'user/SET_ROLES',
  SET_PERMISSIONS: 'user/SET_PERMISSIONS',
};

// Action Creators
export const actions = {
  /**
   * 登入
   * @param username 帳號
   * @param password 密碼
   */
  login(username: string, password: string) {
    return async (dispatch: Dispatch<AnyAction>) => {
      let status: number = 0;
      let statusText: string = '';

      try {
        const res = await auth.post('/signin', { username, password });

        if (res.data && res.data.token) {
          const decoded: IClaims = jwtDecode(res.data.token);
          dispatch({
            type: types.LOGIN,
            id: decoded.jti,
            name: decoded.name,
            username: decoded.username,
            email: decoded.email,
            address: decoded.address,
            token: res.data.token,
            roles: decoded.roles,
            permissions: decoded.permissions,
          });

          localStorage.setItem('@Ricky:token', res.data.token);

          status = res.status;
          statusText = res.statusText;
        }
      } catch (error) {
        if (error.response) {
          status = error.response.status;
          statusText = error.response.data.message;
        } else if (error.request) {
          status = error.request.status;
          statusText =
            error.request.statusText === ''
              ? 'no response'
              : error.request.statusText;
        }
      }

      return { status, statusText };
    };
  },

  /**
   * 登出
   */
  logout() {
    return (dispatch: Dispatch<AnyAction>) => {
      dispatch({
        type: types.LOGOUT,
      });

      localStorage.removeItem('@Ricky:token');
    };
  },

  /**
   * Get Roles
   */
  getRoles() {
    return async (dispatch: Dispatch<AnyAction>) => {
      const { data } = await auth.get('/roles/web');

      dispatch({
        type: types.SET_ROLES,
        roles: data.roles,
      });
    };
  },

  /**
   * Get Permissions
   */
  getPermissions() {
    return async (dispatch: Dispatch<AnyAction>) => {
      const { data } = await auth.get('/permissions/web');

      dispatch({
        type: types.SET_PERMISSIONS,
        permissions: data.permissions,
      });
    };
  },
};

export interface IStoreState {
  login: boolean;
  id: number;
  name: string;
  username: string;
  email: string;
  address: string;
  token: null;
  roles: string[];
  permissions: object;
};

const initialState = {
  login: false,
  id: 0,
  name: '',
  username: '',
  email: '',
  address: '',
  token: null,
  roles: [],
  permissions: {},
};

// reducer
export default (
  state: IStoreState = initialState,
  action: AnyAction,
): IStoreState => {
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state,
        id: action.id,
        login: true,
        name: action.name,
        username: action.username,
        email: action.email,
        address: action.address,
        token: action.token,
        roles: action.roles,
        permissions: action.permissions,
      };

    case types.LOGOUT:
      return {
        ...state,
        id: 0,
        login: false,
        name: '',
        username: '',
        email: '',
        address: '',
        token: null,
        roles: [],
        permissions: {},
      };

    case types.SET_ROLES:
      return {
        ...state,
        roles: action.roles,
      };

    case types.SET_PERMISSIONS:
      return {
        ...state,
        permissions: action.permissions,
      };

    default:
      return state;
  }
};
