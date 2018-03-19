import React from 'react';
import PropTypes from 'prop-types';

import echarts from 'echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

import option from './config';

export default class ThirdLine extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { id, data: { data_y1, data_y2, data_y3 } } = this.props;
    option.series[0].data = data_y1;
    option.series[1].data = data_y2;
    option.series[2].data = data_y3;
    const myChart = echarts.init(document.getElementById(this.props.id));
    myChart.setOption(option);
  }

  render() {
    const { id } = this.props;
    const style = {
      width: '100%',
      height: '100%'
    };
    return <div id={id} style={style} />;
  }
}
