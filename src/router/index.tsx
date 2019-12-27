import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import React, { Suspense } from 'react';
import path from 'path';
import routes from './config';


const RouteItem = (props:any) => {
    const { redirect, path: routePath, component, key } = props;
    if (redirect) {
        return (
            <Redirect
                exact
                key={key}
                from={routePath}
                to={redirect}
            />
        );
    }
    return (
        <Route
            key={key}
            component={component}
            path={routePath}
        />
    );
};

const router = () => {
    return (
        <Router>
            <Switch>
                {routes.map((route:any, id) => {
                    const { component: RouteComponent, children, ...others } = route;
                    return (
                        <Route
                            key={id}
                            {...others}
                            component={(props:any) => {
                                return (
                                    children ? (
                                        <RouteComponent key={id} {...props}>
                                            <Suspense fallback={<div>Loading...</div>}>
                                                <Switch>
                                                    {children.map((routeChild:any, idx:any) => {
                                                        const { redirect, path: childPath, component } = routeChild;
                                                        return RouteItem({
                                                            key: `${id}-${idx}`,
                                                            redirect,
                                                            path: childPath && path.join(route.path, childPath),
                                                            component,
                                                        });
                                                    })}
                                                </Switch>
                                            </Suspense>
                                        </RouteComponent>
                                    ) : (
                                            <Suspense fallback={<div>Loading...</div>}>
                                                {
                                                    RouteItem({
                                                        key: id,
                                                        ...props,
                                                    })
                                                }
                                            </Suspense>
                                        )
                                );
                            }}
                        />
                    );
                })}
            </Switch>
        </Router>
    );
};

export default router;