import React from 'react';
import PieChart from 'components/PieChart'
import './demo.less'

export default class Demo extends React.Component {
    state = {
        count: 500,
        inline: 380,
        outline: 120
    }
    render() {
        const { inline, outline } = this.state;
        const dataSource = {
            key: 'device',
            values: [
                { region: 'inline', count: inline },
                { region: 'outline', count: outline }
            ]
        }
        return (
            <div class='media-publish-stat'>
                <h4>在线设备图</h4>
                <div class='normal-device clearfix'>
                    {count ? <PieChart id='normal-device' className='left' dataSource={dataSource} color={['#fa919c', '#f83d59']} />
                        : <div class='left'>暂无设备</div>
                    }
                    <div class='right'>
                        <h5>设备数：{count}</h5>
                        <p><i class='dot normal-inline' />在线：{inline}</p>
                        <p><i class='dot normal-outline' />离线：{outline}</p>
                    </div>
                </div>
            </div>
        )
    }
}