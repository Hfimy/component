export default {
  title: {
    text: '',
    textStyle: {
      color: '#fff'
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: {
    x: 'left', //图例水平安放位置
    textStyle: {
      color: '#fff' // 图例文字颜色
    },
    data: [, '老客', '新客', '全部']
  },
  toolbox: {
    feature: {
      //   saveAsImage: {}  //保存下载按钮
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
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
        23
      ],
      axisLabel: {
        show: true,
        textStyle: {
          color: '#fff'
        }
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      axisLabel: {
        show: true,
        textStyle: {
          color: '#fff'
        }
      }
    }
  ],
  series: [
    {
      name: '老客',
      type: 'line',
      stack: '总量',
      areaStyle: { normal: {} },
      data: [],
      smooth: true
    },
    {
      name: '新客',
      type: 'line',
      stack: '总量',
      areaStyle: { normal: {} },
      data: [],
      smooth: true
    },
    {
      name: '全部',
      type: 'line',
      stack: '总量',
      areaStyle: { normal: {} },
      data: [],
      smooth: true
    }
  ]
};
