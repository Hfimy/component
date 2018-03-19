import React, {Component} from 'react'
import echarts from 'echarts';

import 'echarts/lib/chart/scatter';
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/map/js/china'

import option from './config';

export default class Scatter extends Component{
    componentDidMount(){
        const myChart=echarts.init(document.getElementById('distribution'))
        myChart.setOption(option)
    }
    render(){
        const style={
            width: "100%",
            height:'100%'
        }
        return(
            <div id='distribution' style={style}></div>
        )
    }
}

