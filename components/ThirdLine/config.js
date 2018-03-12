export default {
  grid: {
    show: false,
    left: 20,
    right: 20,
    bottom: 40,
    containLabel: true
  },
  xAxis: {
    show: true,
    type: 'category',
    boundaryGap: false,
    data: [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24
    ],
    axisLabel: {
      show: true,
      interval: 5,
      formatter: value => {
        if (value < 10) {
          return `0${value}:00`;
        }
        return `${value}:00`;
      },
      showMaxLabel: true,
      textStyle: {
        color: '#666',
        fontSize: 16,
        fontWeight: 500
      }
    }
  },
  yAxis: {
    show: true,
    type: 'value',
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: false
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: 'rgb(50,50,50)'
      }
    }
  },
  series: [
    {
      name: '',
      type: 'line',
      areaStyle: {
        color: 'rgb(50,104,154)'
      },
      lineStyle: {
        color: 'rgb(84,170,255)',
        type: 'solid',
        width: 4
      },
      data: [],
      symbolSize: '0',
      smooth: true,
      markPoint: {
        data: [],
        symbol: 'pin',
        symbolSize: [100, 30],
        symbolOffset: [0, 0],
        itemStyle: {
          color: 'rgb(50,104,154)'
        }
      }
    },
    {
      name: '',
      type: 'line',
      areaStyle: {
        color: 'rgb(45,49,74)'
      },
      lineStyle: {
        color: 'rgb(77, 222, 106)',
        type: 'solid',
        width: 4
      },
      data: [],
      symbolSize: '0',
      smooth: true,
      markPoint: {
        data: [],
        symbol: 'pin',
        symbolSize: [100, 30],
        symbolOffset: [0, 0],
        itemStyle: {
          color: 'rgb(68,70,153)'
        }
      }
    },
    {
      name: '',
      type: 'line',
      areaStyle: {
        color: 'rgb(47,64,94)'
      },
      lineStyle: {
        color: 'rgb(98, 41, 253)',
        type: 'solid',
        width: 4
      },
      data: [],
      symbolSize: '0',
      smooth: true,
      markPoint: {
        data: [],
        symbol: 'pin',
        symbolSize: [100, 30],
        symbolOffset: [0, 0],
        itemStyle: {
          color: 'rgb(50,104,154)'
        }
      }
    }
  ]
};
