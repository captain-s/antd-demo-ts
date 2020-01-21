import React, { useState, useEffect } from 'react';
import { Form, Icon, Input, Button, Row, Col } from 'antd';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux'
import { saveToken } from '../../store/action';
import store from '../../store';
import { ajax } from '../../libs/axios';
import './style.less';
// interface Props {
//     form?: any
// }

// interface State {
//     value?: string,
//     verifyImg?:string
// }

// interface FormProps extends FormComponentProps {
//     username: string,
//     password: string,
//     verify_code: string,
// }

// interface FormLister {
//     verifyImg:any,
// }

function UserForm(Props:any):any{
    const [verifyImg, setVerifyImg] = useState('');
    const {form,bindToken} = Props;
    const { getFieldDecorator } = form;
    let history = useHistory()
    function handleSubmit(e:any){
        e.preventDefault();
        form.validateFields((err:any, values:string) => {
            if (!err) {
                ajax.post('/user/login',values).then((res:any)=>{
                    let data = res.data;
                    if( data.error_code === 0){
                        bindToken(data.data.token)
                        console.log(store.getState())
                        history.push('/media/list');
                    } else {
                        // 清空验证码
                        getCode()
                    }
                })
            }
        });
    }
    
    useEffect(()=>{
        getCode()
    },[])

    // 获取验证码
    function getCode() {
        ajax.get('/api/verify/code')
        .then((res)=>{   
            let data = res.data
            if(data.error_code === 0){
                let src =  data.data.data
                setVerifyImg(`data:image/gif;base64,${src}`)
            }      
        })
    }

    return (
        <div>
        <h2 style={{textAlign:'center',paddingTop:'100px',paddingBottom:'60px'}}>Login page</h2>
        <Form onSubmit={handleSubmit} className="login-form">
            <Form.Item>
                {getFieldDecorator('username', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                })(
                    <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Username"
                        size="large"
                    />,
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                    <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Password"
                        size="large"
                    />,
                )}
            </Form.Item>
            <Form.Item>
            <Row gutter={8}>
                <Col span={12}>
                {getFieldDecorator('verify_code', {
                    rules: [{ required: true, message: 'Please input message code!' }],
                })(
                    <Input 
                        prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                        type = "text"
                        placeholder="Message code"
                        size="large"
                    />
                )}
                </Col>
                <Col span={12} style={{textAlign: 'right'}}>
                    <img 
                    src={verifyImg} 
                    style={{width:'160px',height:'40px'}}
                    onClick={()=>{getCode()}}
                    alt="msgcode"
                    />
                </Col>
            </Row>
            </Form.Item>
            <Form.Item>
                <Button type="primary" size="large" htmlType="submit" className="login-form-button">
                            Log in
                </Button>
            </Form.Item>
        </Form>
        </div>
    )
}
function mapStateToProps(state:any) {
    return {
        TOKEN: state.TOKEN
    }
}
function mapDispatchToProps(dispatch:any) {
    return {
        bindToken: (token:string) => {
            dispatch(saveToken(token))
        }
    }
}


const LoginForm = Form.create({ name: 'normal_login' })(UserForm);
const WrappedNormalLoginForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm)

export default () => <WrappedNormalLoginForm />;