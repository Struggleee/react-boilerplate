import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RenderAuthorized from 'ant-design-pro/lib/Authorized';
import { IMenus, IContentRoute } from './../types';

import Home from './../components/Home';
import NoMatch from './../components/Exception/NoMatch';
import Forbidden from './../components/Exception/Forbidden';

function formatter(menus: IMenus[]) {
  return menus.reduce((router: IMenus[], item: IMenus) => {
    if (item.path && item.component) {
      router.push(item);
    } else if (item.children) {
      formatter(item.children).forEach(element => router.push(element));
    }

    return router;
  }, []);
}

const ContentRoute = ({ menus, permissions }: IContentRoute) => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      {formatter(menus).map(route => {
        const { Secured } = RenderAuthorized(route.key);

        return (
          <Route
            exact
            key={route.key}
            path={route.path}
            component={Secured(permissions, <Forbidden />)(route.component)}
          />
        );
      })}
      <Route component={NoMatch} />
    </Switch>
  );
};

export default ContentRoute;
