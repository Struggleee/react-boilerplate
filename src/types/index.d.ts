export interface IClaims {
  jti: number;
  name: string;
  username: string;
  email: string;
  address: string;
  roles: string[];
  permissions: object;
  exp: number;
}

export interface IMenus {
  key: string;
  icon?: string;
  path?: string;
  component?: any;
  children?: IMenus[];
}

export interface IContentRoute {
  menus: IMenus[];
  permissions: string[];
}
