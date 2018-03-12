import React from 'react';
import PropTypes from 'prop-types';

import echarts from 'echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

import option from './config';

export default class Pie extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    color: PropTypes.array.isRequired
  };
  componentDidMount() {
    const { name, id, data, color } = this.props;
    option.series[0].name = name;
    option.series[0].data = data;
    option.series[0].color = color;
    const myChart = echarts.init(document.getElementById(id));
    myChart.setOption(option);
  }
  render() {
    const style = {
      width: '100%',
      height: '100%'
    };
    return <div id={this.props.id} style={style} />;
  }
}
