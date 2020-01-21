import React, { useState, useEffect } from 'react';
import { Slider, Button, Table, Tag } from 'antd';
import { ColumnProps } from 'antd/es/table';
import store from '../../store';
import { ajax } from '../../libs/axios';

interface Color {
    r: number,
    g: number,
    b: number
};
function Rectangle() {
    const [height, setHeight] = useState<number>(10);
    const [width, setWidth] = useState(10);
    const [color, setColor] = useState<Color>({ r: 0, g: 0, b: 0 });
    const [radius, setRadius] = useState<number>(0);
    
    const style = {
        height: `${height}px`,
        width: `${width}px`,
        backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
        borderRadius: `${radius}px`
    }
    // 目前有如下问题，onChange的参数 为 Number | Number[], 
    // 我在typescript声明的时候，如果不声明any，就报错，那我该声明什么？

    // 特别点，在于状态被定义为引用数据类型时，是如何更改状态的 38行。      state改变 永远是异步的
    return (
        <div>
            <p>height:</p>
            <Slider max={300} min={10} range={false} onChange={(value:any)=>setHeight(value)}/>
            <p>width:</p>
            <Slider max={300} min={10} onChange={(value:any)=>setWidth(value)}/>
            <p>Radius:</p>
            <Slider max={300} min={10} onChange={(value:any)=>setRadius(value)}/>
            <p>color: R</p>
            <Slider
                max={255}
                min={0}
                onChange={(n:any) => setColor({ ...color, r: n })}
            />
            <p>color: G</p>
            <Slider
                max={255}
                min={0}
                onChange={(n:any) => setColor({ ...color, g: n })}
            />
            <p>color: B</p>
            <Slider
                max={255}
                min={0}
                onChange={(n:any) => setColor({ ...color, b: n })}
            />
            <div style={style}></div>
        </div>
    )
};

interface User {
    id: string,
    dataIndex:number,
    name: string,
    aff_name: string,
    os_type: string,
    incentive_app:string,
    ctime:string,
    ad_cnt:string,
    auditor:string,
    audit_time:string,
    approvalText:string,
    refuse_reason:string,
    tags: [],
}
function List_table(props:any) {
    const columns: ColumnProps<User>[] = [
            {
            title: '媒体名称',
            dataIndex: 'name',
            className:'left',
            align:'center',
            render: (text:any) => <a>{text}</a>,
            },
            {
            title: '媒体ID',
            dataIndex: 'id',

            },
            {
            title: '渠道名称',
            dataIndex: 'aff_name',
            },
            {
            title: '系统平台',
            dataIndex: 'os_type',
            },
            {
            title: '是否为激励型媒体',
            dataIndex: 'incentive_app',

            },
            {
            title: '创建时间',
            dataIndex: 'ctime',

            },
            {
            title: '广告位数量',
            dataIndex: 'ad_cnt',

            },
            {
            title: '操作人',
            dataIndex: 'auditor',

            },
            {
            title: '审核时间',
            dataIndex: 'audit_time',

            },
            {
            title: '状态',
            dataIndex: 'approvalText',

            render:(approvalText:any,params:any)=>{
                    const approval = Number(params.approval)
                    switch(approval){
                        case 0 :
                        return <Tag color="#f50">{approvalText}</Tag>;
                        case 1 :
                            return <Tag color="#2db7f5">{approvalText}</Tag>;
                        case 2 :
                            return <Tag color="#87d068">{approvalText}</Tag>;
                        default:
                            return <Tag color="#108ee9">{approvalText}</Tag>
                    }
                }
            },
            {
            title: '备注',
            dataIndex: 'refuse_reason',

            },
            {
            title: '操作',
            dataIndex: 'approval',
            render:(approvalText:any,params:any)=>{
                console.log(params)
                const approval = Number(params.approval)

                if(approval === 0){
                    return (
                        <a onClick={() => props.fetchData()}>拒绝</a>
                    )
                }else{
                    return (<a onClick={() => props.fetchData()}>审核</a>)
                }
            }
            },
        ];
        let data = props.dataSource
    return (
        <div>
            <Table 
            rowKey={data => data.id} 
            columns={columns} 
            dataSource={data} 
            bordered
            pagination = {false}
            />
        </div>
    )
};


interface Params {
    os_type?:string | number,   //系统平台
    incentive_app?:string | number, //是否为激励型媒体
    approval?:string | number,   //状态
    aff_id?:string | number, //渠道名称
    app_id?:string | number,   //媒体名称
    pn?:number,         //当前页
    rn?:number          //当前页展示数
};

export default function Counter() {
    const [counter,setCounter] = useState<number>(0);
    const [param] = useState<Params>({pn:1,rn:20});
    const [paramTable,setParamTalbe] = useState([]);
    function fetchListData() {
        ajax.post('/app/list',param).then((res:any)=>{
            let data = res.data;
            if( data.error_code === 0){
                console.log(data)
                setParamTalbe(data.data.list)
            }
        })
    };
    function searchByName(pn: number) {
        param.pn = pn
        // 改变param之后立即执行请求数据的代码
        // 这里的问题是，因为异步的原因，param并不会马上发生变化，
        // 此时直接发送请求无法拿到最新的参数
        fetchListData();
    };
    useEffect(()=>{
        fetchListData()
    },[])
    return (
        <div>
            <div key="a">{counter}</div>
            <Button key="b" type="primary" onClick={()=>searchByName(2)}>点击加一</Button>
            <Rectangle/>
            <List_table dataSource = {paramTable} fetchData={fetchListData}/>
        </div>
    )
};
