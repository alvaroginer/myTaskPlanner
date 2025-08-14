<template>
  <div class="glass-card temp-container">
    <div>
      <h4>Date: {{ date }}</h4>
      <p>Avg. Temperature {{ getAvg(temperatures) }} ºC</p>
    </div>
    <button @click="toggleShowChart">
      {{ showChart ? 'Close Tab' : 'Open Tab' }}
    </button>
    <div v-if="showChart">
      <WeatherChart
        :chart-data="temperatures"
        :chart-labels="hours"
        :y-axis-at-cero="false"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import { getAvg, hours } from '../../lib/utils';
import WeatherChart from '../charts/WeatherChart.vue';

export default defineComponent({
  name: 'DayWeekCard',
  props: {
    date: { type: String as PropType<string>, required: true },
    temperatures: { type: Array as PropType<number[]>, required: true },
  },
  data() {
    return {
      hours,
      showChart: false as boolean,
    };
  },

  components: {
    WeatherChart,
  },
  methods: {
    getAvg,
    toggleShowChart() {
      this.showChart = !this.showChart;
    },
  },
});
</script>

<style scoped>
.temp-container {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 6px;
  margin-bottom: 20px;
  margin-right: 20px;
}
</style>
