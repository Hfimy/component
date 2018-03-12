import React from 'react';
import PropTypes from 'prop-types';

import echarts from 'echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

import option from './config';

export default class LineArea extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  };
  componentDidMount() {
    console.log(this.props.data);
    option.series[0].data = this.props.data[0];
    option.series[1].data = this.props.data[1];
    option.series[2].data = this.props.data[2];
    const myChart = echarts.init(document.getElementById('line'));
    myChart.setOption(option);
  }
  render() {
    const style = {
      width: '100%',
      height: '100%'
    };
    return <div id="line" style={style} />;
  }
}
