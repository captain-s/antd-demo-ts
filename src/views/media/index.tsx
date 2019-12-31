import React, { useState, useEffect } from 'react';
import { Slider, Button } from 'antd';
import store from '../../store';
import { ajax } from '../../libs/axios';

interface Color {
    r: number,
    g: number,
    b: number
};
function Rectangle() {
    console.log(1)
    console.log(store.getState().setToken)
    console.log(1)
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

interface Params {
    os_type?:string | number,   //系统平台
    incentive_app?:string | number, //是否为激励型媒体
    approval?:string | number,   //状态
    aff_id?:string | number, //渠道名称
    app_id?:string | number,   //媒体名称
    pn?:number,         //当前页
    rn?:number          //当前页展示数
}

export default function Counter() {
    const [counter,setCounter] = useState<number>(0);
    const [param] = useState<Params>({});
    function fetchListData() {
        ajax.post('/app/list',param).then((res:any)=>{
            let data = res.data;
            if( data.error_code === 0){
                console.log(data)
                
            } else {
                console.log(data)
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
        </div>
    )
};
