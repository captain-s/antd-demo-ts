import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Menu, Icon } from 'antd';
import './style.less';
import { useStore } from 'react-redux';


const asideMenuConfig = [
    {
        name: '媒体管理',
        path: '/media',
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
        path: '/flow',
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
interface List {    //interface定义List接口，包含两个成员
    name: string,
    index:string, 
    path:string
}
interface setMenu {
    children?: List[],
    icon?:string,
    index:string,
    name:string,
    path:string
}
interface Result {  // interface定义Result接口
    data: setMenu[]
}

function getSubMenuItem(item:setMenu, index:number) {
    const { SubMenu } = Menu;
    if(item.children){
        const childrenItems = getMenuItem(item.children);
        if(childrenItems && childrenItems.length > 0){
            return (
                <SubMenu
                key={item.index}
                title={
                    <span>
                    <Icon type={item.icon ? item.icon : ''} />
                    <span>{item.name}</span>
                    </span>
                }
                >
                {childrenItems}
                </SubMenu>
            )
        }   
        return null;
    }
    return (
        <Menu.Item key={item.index} >
            <Link to={item.path}>{item.name}</Link>
        </Menu.Item>
    )
}
function getMenuItem(menuData:Result['data']){
    if(!menuData){ return []; }
    return menuData.filter(item => item.name)
    .map((item,index)=>{
        return getSubMenuItem(item,index)
    })
}
// function onOpenChange(params:string[]) {
//     const lasestOpenKey = params.find(key=> this.state.openKeys.indexOf(key) === -1)
// }

export default function BasicMenu(props: any) {
    const [submenuKeys, setSubmenuKeys] = useState(['media_ma','flow_ma'])
    const [onOpenKeys, setOnOpenKeys] = useState(['media_ma'])
    const onOpenChange = (openKeys:string[]) => {
        const lasestOpenKey = openKeys.find(key=> onOpenKeys.indexOf(key) === -1)
        if( (lasestOpenKey && submenuKeys.indexOf(lasestOpenKey) === -1) ){
            setOnOpenKeys(openKeys)
        }else{
            lasestOpenKey ? setOnOpenKeys([lasestOpenKey]) : setOnOpenKeys([])
        }
    }
    // function onOpenChange(params:string[]) {
        
    // }
    return (
        <Menu 
        theme="dark" 
        mode="inline"
        defaultSelectedKeys={['media']}
        defaultOpenKeys={['media_ma']}
        openKeys={onOpenKeys}
        onOpenChange={onOpenChange}
        >
            {getMenuItem(asideMenuConfig)}
        </Menu>
    )
}