import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Registration from "../containers/Auth/Registration";
// we can make the config file and import the urls from that configuration
const ROUTES = [
  {
    path: "/",
    key: "ROOT",
    exact: true,
    component: () => <Registration />,
  },
  {
    path: "/app",
    key: "APP",
    component: RenderRoutes,
    routes: [
      {
        path: "/app",
        key: "APP_ROOT",
        exact: true,
        component: () => <h1>App Index</h1>,
      },
    ],
  },
];

export default ROUTES;
/**
 * Render a route with potential sub routes
 */
function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => <route.component {...props} routes={route.routes} />}
    />
  );
}

/**
 * Use this component for any new section of routes (any config object that has a "routes" property
 */
export function RenderRoutes({ routes }) {
  return (
    <BrowserRouter>
      <Switch>
        {routes.map((route, i) => {
          return <RouteWithSubRoutes key={route.key} {...route} />;
        })}
        <Route component={() => <h1>Not Found!</h1>} />
      </Switch>
    </BrowserRouter>
  );
}
