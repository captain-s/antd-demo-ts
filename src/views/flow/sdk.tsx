import React, {useState} from 'react';
import {  Row, Col, Card, Button, List, Carousel, Spin } from 'antd';
import useFeed from '_c/hook/useFeed';
import './style.less';

export default function Sdk() {
    const {feed, setLoading, loading} = useFeed();
    const [arrA, setArrA] = useState<number[]>([]);
    const [arrB, setArrB] = useState<number[]>([]);
    const isEqual = equalArray(arrA,arrB);
    function equalArray(a: number[], b: number[]) {
        if(a.length !== b.length) {
            return false;
        }
        if(a.length === 0 && b.length === 0){
            return true;
        }
        return a.every((item,index) => item === b[index]);
    };
    if(loading){
        return <div><Spin size="large" /></div>
    }
    if(!feed) {
        return null
    }
    const {stories, top_stories} = feed;

    const data = [
        {
        "image_hue": "0x57403d",
        "title": "三十岁左右的人，可以从哪些方面反思自己的生活状态？",
        "url": "https://daily.zhihu.com/story/9719272",
        "hint": "简单心理 · 8 分钟阅读",
        "ga_prefix": "012111",
        "images": [
        "https://pic1.zhimg.com/v2-50bb3373b1bd58bad6e7fc0450485c0c.jpg"
        ],
        "type": 0,
        "id": 9719272
        },
        {
        "image_hue": "0x968769",
        "title": "我国铁路和民航部门是怎样完成春运重任的？",
        "url": "https://daily.zhihu.com/story/9719263",
        "hint": "星球研究所 · 8 分钟阅读",
        "ga_prefix": "012109",
        "images": [
        "https://pic3.zhimg.com/v2-27c1d072a3a5ae1fdecdcbfed17fcfe2.jpg"
        ],
        "type": 0,
        "id": 9719263
        },
        {
        "image_hue": "0xa9875c",
        "title": "艺术除了审美，还有什么作用？",
        "url": "https://daily.zhihu.com/story/9719284",
        "hint": "庄泽曦 · 5 分钟阅读",
        "ga_prefix": "012107",
        "images": [
        "https://pic3.zhimg.com/v2-56147f54525a87ca30ad9fb02c5bdee6.jpg"
        ],
        "type": 0,
        "id": 9719284
        },
        {
        "image_hue": "0xb38f7d",
        "title": "瞎扯 · 如何正确地吐槽",
        "url": "https://daily.zhihu.com/story/9719258",
        "hint": "VOL.2311",
        "ga_prefix": "012106",
        "images": [
        "https://pic4.zhimg.com/v2-3df3993e6ae04cb0f2eb290e376b041b.jpg"
        ],
        "type": 0,
        "id": 9719258
        }
        ];

    return (
        <div>
            <Row>
                <Col span={10}>
                    <Card>
                        <Button type="primary" onClick={()=> setArrA([...arrA, 1])}>新增数字1到arrA</Button>
                            {
                                arrA.map((item,index) => (
                                    <p key={index}>{item}</p>
                                ))
                            }
                        <Button type="primary" onClick={()=> setArrA([...arrA, 2])}>新增数字2到arrA</Button>
                    </Card>
                </Col>
                <Col span={4}>
                    {isEqual.toString()}
                </Col>
                <Col span={10}>
                    <Card>
                        <Button type="primary" onClick={()=> setArrB([...arrB, 1])}>新增数字1到arrB</Button>
                            {
                                arrB.map((item,index) => (
                                    <p key={index}>{item}</p>
                                ))
                            }
                        <Button type="primary" onClick={()=> setArrB([...arrB, 2])}>新增数字2到arrB</Button>
                    </Card>
                </Col>
            </Row>
            <Button onClick={() => setLoading(true)}>刷新</Button>
            <div className="zhCarousel">
                <Carousel autoplay>
                {top_stories.map((item, i) => (
                    <a className="top_feed_item" key={i} href={item.url}>
                        <img src={item.image} alt="" />
                        <div className="title">{item.title}</div>
                    </a>
                ))}
                </Carousel>
            </div>
            <div className="zhList">
                <List
                bordered
                itemLayout="vertical"
                dataSource={stories}
                renderItem={(item:any) => (
                        <List.Item
                        key={item.id}
                        extra={
                            <img
                            width={100}
                            alt="img"
                            src={item.images[0]}
                            />
                        }
                        >
                            <List.Item.Meta 
                            style={{textAlign:'left'}}
                            title={<a href={item.url}>{item.title}</a>} />  
                            {<span style={{textAlign:'left',display:'inline-block',width: '100%'}}>{item.hint}</span>}
                        </List.Item>
                    )}/>
            </div>
        </div>
    )    
}
