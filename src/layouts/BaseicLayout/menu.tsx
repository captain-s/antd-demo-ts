import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Menu, Icon } from 'antd';
import { asideMenuConfig } from '../../menu'
import './style.less';
import { useStore } from 'react-redux';



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
    path?:string
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
            {item.path? <Link to={item.path}>{item.name}</Link> : <span>{item.name}</span>}
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
    // 处理展开 关闭  openKeys  onOpenChange
    const submenuKeys = ['media_ma','flow_ma']
    const [onOpenKeys, setOnOpenKeys] = useState(['media_ma'])
    const onOpenChange = (openKeys:string[]) => {
        const lasestOpenKey = openKeys.find(key=> onOpenKeys.indexOf(key) === -1)
        
        if( (lasestOpenKey && submenuKeys.indexOf(lasestOpenKey) === -1) ){
            setOnOpenKeys(openKeys)
        }else{
            lasestOpenKey ? setOnOpenKeys([lasestOpenKey]) : setOnOpenKeys([])
        }
    }
    // 处理点击
    const [onSeletedKeys,setOnSeletedKeys] = useState(['media'])
    const handleClick = (e:any) => {
        setOnSeletedKeys([e.key])
    }
    return (
        <Menu 
        theme="dark" 
        mode="inline"
        openKeys={onOpenKeys}
        onOpenChange={onOpenChange}
        selectedKeys={onSeletedKeys}
        onClick={handleClick}
        >
            {getMenuItem(asideMenuConfig)}
        </Menu>
    )
}