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
        path: '/login',
        component: UserLayout,
        children:[
            {
                path: '',
                component: UserLogin,
            }
        ]
    },
    {
        path: '/',
        component:BasicLayout,
        children:[
            {
                path: '/',
                redirect: '/media/list',
            },
            {
                path: '/media/list',
                component: Media,
            },
            {
                path: '/media/advertisement',
                component: Advertisement,
            },
            {
                path: '/flow/sdk',
                component: Sdk,
            },
            {
                path: '/flow/api',
                component: Api,
            },
            {
                path: '/flow/plat',
                component: Plat,
            },
        ]
    },
    // {
    //     path: '/flow',
    //     component:BasicLayout,
    //     children:[
    //         {
    //             path: '/',
    //             redirect: '/sdk',
    //         },
    //         {
    //             path: '/sdk',
    //             component: Sdk,
    //         },
    //         {
    //             path: '/api',
    //             component: Api,
    //         },
    //         {
    //             path: '/plat',
    //             component: Plat,
    //         },
    //     ]
    // }
]
export default routerConfig;