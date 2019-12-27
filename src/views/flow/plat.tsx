import React, {Component} from 'react';
import { Button } from 'antd';

export default class button extends Component<any> {
    render() {
        return (
            <div>
                <Button type="primary">plat</Button>
                <Button>Default</Button>
                <Button type="dashed">Dashed</Button>
                <Button type="danger">Danger</Button>
                <Button type="link">Link</Button>
            </div>
        )
    }
}