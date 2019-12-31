const asideMenuConfig = [
    {
        name: '媒体管理',

        index:'media_ma', 
        icon: 'mail',
        children: [
            {
            name: '媒体管理',
            index:'media', 
            path: '/media/list',
            },
            {
            name: '广告位管理',
            index:'advertisement', 
            path: '/media/advertisement',
            },
        ],
    },
    {
        name: '流量配置管理',

        index:'flow_ma', 
        icon: 'appstore',
        children: [
            {
            name: 'SDK聚合配置',
            index:'sdk_flow', 
            path: '/flow/sdk',
            },
            {
            name: 'API策略配置',
            index:'api_flow',
            path: '/flow/api',
            },
            {
            name: '广告平台资源管理',
            index:'plat_flow', 
            path: '/flow/plat',
            },
        ],
    },
];
export { asideMenuConfig };