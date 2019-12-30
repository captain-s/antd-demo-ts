import React from 'react';

import UserLayout from '../layouts/UserLayout';
import BasicLayout from '../layouts/BaseicLayout';

const UserLogin = React.lazy(() => import('../views/login'));

const Media = React.lazy(() => import('../views/media'));
const Advertisement = React.lazy(() => import('../views/media/advertisement'));

const Sdk = React.lazy(() => import('../views/flow/sdk'));
const Api = React.lazy(() => import('../views/flow/api'));
const Plat = React.lazy(() => import('../views/flow/plat'));


const routerConfig = [
    {
        path: '/user',
        component: UserLayout,
        children:[
            {
                path: '/',
                redirect: '/user/login',
            },
            {
                path: '/login',
                component: UserLogin,
            }
        ]
    },
    {
        path: '/media',
        component:BasicLayout,
        children:[
            {
                path: '/',
                redirect: '/list',
            },
            {
                path: '/list',
                component: Media,
            },
            {
                path: '/advertisement',
                component: Advertisement,
            },
        ]
    },
    {
        path: '/flow',
        component:BasicLayout,
        children:[
            {
                path: '/',
                redirect: '/sdk',
            },
            {
                path: '/sdk',
                component: Sdk,
            },
            {
                path: '/api',
                component: Api,
            },
            {
                path: '/plat',
                component: Plat,
            },
        ]
    }
]
export default routerConfig;