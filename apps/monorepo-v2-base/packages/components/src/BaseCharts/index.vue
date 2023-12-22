<template>
  <div :id="props.id"></div>
</template>

<script lang="ts">
//TODO resize优化
// 全局变量，用于存储reactive handler
const chartReactive: Record<string, any> = {};
export default {};
</script>

<script lang="ts" name="BaseCharts" setup>
import echarts, { EchartsOptions } from 'echarts';
import { Nullable } from '../../../type/src/utils';
import { uniqueId } from 'utils';
import { onMounted, onUnmounted } from 'vue';
/**
 *
 * @description 5.0以上版本echarts取消了自带的geoJSON，需要从第三方下载
 *
 *
 */
interface Props {
  options?: EchartsOptions;
  id?: string;
  beforeInit?: (echart: Nullable<echarts.ECharts>) => any;
}
const props = withDefaults(defineProps<Props>(), {
  options: () => {
    return {};
  },
  id: () => uniqueId(),
  beforeInit: () => {
    //
  },
});

// ehcharts实例
let chart: Nullable<echarts.ECharts> = null;

// 设置echart图表参数
const setOption = <Opt extends echarts.EChartsCoreOption>(option: Opt) => {
  return chart?.setOption(option);
};
// 获取当前echart参数
const getOption = () => {
  return chart?.getOption();
};

const initChart = () => {
  chart = echarts.init(document.getElementById(props.id) as HTMLElement);

  function getIns(chart: any) {
    chart.resize();
  }
  chartReactive[uniqueId()] = function () {
    getIns.call(this, chart);
  };

  // 挂载echarts前回调
  props.beforeInit(chart);
  chart &&
    chart.setOption({
      ...props.options,
      // graphic: {
      //   type: 'text',
      //   left: 'center',
      //   top: 'middle',
      //   silent: true,
      //   invisible: true, //是否可见，这里的意思是当没有数据时可见
      //   style: {
      //     fill: 'black',
      //     fontWeight: 'bold',
      //     text: '暂无数据',
      //     fontSize: '26px',
      //   },
      // },
    });
};

const initReactivity = () => {
  window.onresize = function () {
    for (const i of Object.keys(chartReactive)) {
      chartReactive[i]();
    }
  };
};

const uninstallChart = () => {
  chart?.dispose();
  chart = null;
};

const uninstallReactivity = () => {
  window.onresize = null;
};

onMounted(() => {
  initChart();
  initReactivity();
});

onUnmounted(() => {
  uninstallChart();
  uninstallReactivity();
});

defineExpose({
  setOption,
  getOption,
});
</script>

<style lang="scss"></style>
