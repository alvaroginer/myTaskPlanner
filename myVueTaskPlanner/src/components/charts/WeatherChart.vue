<template>
  <canvas ref="chartCanvas"></canvas>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import Chart from 'chart.js/auto';

export default defineComponent({
  name: 'WeatherChart',
  props: {
    chartData: {
      type: Array as PropType<string[] | number[]>,
      required: true,
    },
    chartLabels: {
      type: Array as PropType<(string | number)[]>,
      required: true,
    },
    yAxisAtCero: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
  },
  data() {
    return {
      chartInstance: null as any,
    };
  },
  mounted() {
    const canvas = this.$refs.chartCanvas as HTMLCanvasElement;
    this.chartInstance = new Chart(canvas, {
      type: 'line',
      data: {
        labels: this.chartLabels,
        datasets: [
          {
            label: 'Temperatures in ºC',
            data: this.chartData,
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: this.yAxisAtCero,
          },
        },
      },
    });
  },
  // watch: {
  //   chartData(newData) {
  //     if (this.chartInstance) {
  //       this.chartInstance.data.datasets[0].data = newData;
  //       this.chartInstance.update();
  //     }
  //   },
  //   chartLabels(newLabels) {
  //     if (this.chartInstance) {
  //       this.chartInstance.data.labels = newLabels;
  //       this.chartInstance.update();
  //     }
  //   },
  // },
  beforeUnmount() {
    if (this.chartInstance) {
      this.chartInstance.destroy();
      this.chartInstance = null;
    }
  },
});
</script>
