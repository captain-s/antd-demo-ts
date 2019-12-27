import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import './style.less';

export default function BasicLayout(props: any) {
    const { Content } = Layout;
    return (
        <div className="Layout_bg">
            <Layout>
                <Content style={{backgroundColor:'#ffffff'}}>
                    <div>
                        {props.children}
                    </div>
                </Content>
            </Layout>
            
        </div>
    )
}