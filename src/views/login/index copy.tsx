import React, { Component, useState, useEffect } from 'react';
import { Form, Icon, Input, Button, Row, Col } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { ajax } from '../../libs/axios';
import './style.less';
// interface Props {
//     form?: any
// }

// interface State {
//     value?: string,
//     verifyImg?:string
// }
interface UserFormProps extends FormComponentProps {
    value?: string,
    verifyImg?:string
}
class UserForm extends Component<UserFormProps, any>{

    public state = {
        verifyImg:'http://img1.imgtn.bdimg.com/it/u=2018939532,1617516463&fm=26&gp=0.jpg'
    }
    public handleSubmit = (e:any) => {
        e.preventDefault();
        this.props.form.validateFields((err:any, values:string) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    // 获取验证码
    private getCode() {
        ajax.get('/verify/code')
        .then((res)=>{   
            let data = res.data
            if(data.error_code == 0){
                let src =  data.data.data
                this.setState({
                    verifyImg:`data:image/gif;base64,${src}`
                })
            }      
        })
    }
    componentDidMount(){
        this.getCode()
    }
    render() {
        const { verifyImg } = this.state;
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
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
                    {getFieldDecorator('messageCode', {
                        rules: [{ required: true, message: 'Please input message code!' }],
                    })(
                        <Input 
                            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                            type = "text"
                            placeholder="message code"
                            size="large"
                        />
                    )}
                    </Col>
                    <Col span={12}>
                        <img src={verifyImg} style={{width:'160px',height:'40px'}}/>
                    </Col>
                </Row>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" size="large" htmlType="submit" className="login-form-button">
                                Log in
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}
const WrappedNormalLoginForm = Form.create<UserFormProps>({ name: 'normal_login' })(UserForm);

export default () => <WrappedNormalLoginForm />;