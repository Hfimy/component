//饼状图类
export default class PieChart {
    constructor(wrapper, dataSource, color = null, width = wrapper.offsetWidth, height = wrapper.offsetHeight) {
        this.wrapper = wrapper;  //容器元素
        this.dataSource = dataSource;
        this.width = width;
        this.height = height;
        this.radius = Math.min(this.width, this.height) / 2;
        if (color) {
            this.color = d3.scaleOrdinal().domain(d3.range(color.length)).range(color);  // 如果传入颜色，则使用传入的颜色
        } else {
            this.color = d3.scaleOrdinal(d3.schemeCategory20);  // 使用默认颜色
        }
        this.initChart();
    }
    initChart() {
        const pie = d3.pie()
            .value(function (d) { return d.count; })
            .padAngle(0.04)
            .sort(null)
        const arc = d3.arc()
            .innerRadius(this.radius * 0.85)
            .outerRadius(this.radius)
            .cornerRadius(5)
        const svg = d3.select(this.wrapper).append("svg")
            .attr("width", this.width)
            .attr("height", this.height)
            .attr('viewBox', '0 0 ' + this.width + ' ' + this.height) //当宽高改变时，图表响应式
            .attr('style', 'width:100%')
            .append("g")
            .attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")");
        this.pie = pie;
        this.arc = arc;
        this.svg = svg;

        this.drawChart(this.dataSource)
    }
    drawChart(region) {
        const color = this.color;
        const pie = this.pie;
        const arc = this.arc;
        const svg = this.svg;

        let path = svg.selectAll("path");
        const data0 = path.data();
        const data1 = pie(region.values);

        path = path.data(data1, key);

        path.transition()
            .duration(600)
            .attrTween("d", arcTween);

        path.enter()
            .append("path")
            .each(function (d, i) {
                var narc = findNeighborArc(i, data0, data1, key);
                if (narc) {
                    this._current = narc;
                    this._previous = narc;
                } else {
                    this._current = d;
                }
            })
            .attr("fill", (d, i) => {
                return color(i)
            })
            .transition()
            .duration(600)
            .attrTween("d", arcTween);

        path.exit()
            .transition()
            .duration(600)
            .attrTween("d", function (d, index) {
                var currentIndex = this._previous.data.region;
                var i = d3.interpolateObject(d, this._previous);
                return function (t) {
                    return arc(i(t))
                }
            })
            .remove()

        function key(d) {
            return d.data.region;
        }

        function findNeighborArc(i, data0, data1, key) {
            var d;
            if (d = findPreceding(i, data0, data1, key)) {
                var obj = cloneObj(d)
                obj.startAngle = d.endAngle;
                return obj;
            } else if (d = findFollowing(i, data0, data1, key)) {
                var obj = cloneObj(d)
                obj.endAngle = d.startAngle;
                return obj;
            }
            return null
        }

        // Find the element in data0 that joins the highest preceding element in data1.
        function findPreceding(i, data0, data1, key) {
            var m = data0.length;
            while (--i >= 0) {
                var k = key(data1[i]);
                for (var j = 0; j < m; ++j) {
                    if (key(data0[j]) === k) return data0[j];
                }
            }
        }

        // Find the element in data0 that joins the lowest following element in data1.
        function findFollowing(i, data0, data1, key) {
            var n = data1.length, m = data0.length;
            while (++i < n) {
                var k = key(data1[i]);
                for (var j = 0; j < m; ++j) {
                    if (key(data0[j]) === k) return data0[j];
                }
            }
        }

        function arcTween(d) {
            var i = d3.interpolate(this._current, d);
            this._current = i(0);
            return function (t) {
                return arc(i(t))
            }
        }

        function cloneObj(obj) {
            var o = {};
            for (var i in obj) {
                o[i] = obj[i];
            }
            return o;
        }
    }
    updateChart(data) {
        this.drawChart(data)
    }
    destory() {
        d3.select(this.wrapper).remove();  //移除图表元素
    }
}

