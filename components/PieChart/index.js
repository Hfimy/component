import React from 'react'
import PropTypes from 'prop-types';
import Chart from './pie.js'

export default class PieChart extends React.PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
        dataSource: PropTypes.object.isRequired,
        color: PropTypes.array,
        className: PropTypes.string,
    }
    componentWillMount() {
        this._isMounted = true;
        this.chart = null;
    }
    componentWillUnmount() {
        this.destoryChart()
        this._isMounted = false;
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.dataSource !== this.props.dataSource) {
            this.updateChart(nextProps)
        }
    }
    drawChart = node => {
        if (this._isMounted) {
            const { id, dataSource, color } = this.props;
            this.chart = new Chart(node, dataSource, color)
        }
    }
    updateChart = props => {
        const { dataSource } = props;
        this.chart.updateChart(dataSource);
    }
    destoryChart = () => {
        this.chart.destory();
        this.chart = null;
    }
    render() {
        const { id, className } = this.props;
        return (
            <div id={id} className={className} ref={this.drawChart} />
        )
    }

}