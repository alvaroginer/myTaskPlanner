<template>
  <v-card style="margin-bottom: 20px; padding: 20px">
    <div
      style="display: flex; align-items: center; justify-content: space-between"
    >
      <div>
        <v-card-title>Date: {{ date }}</v-card-title>
        <v-card-subtitle
          >Avg. Temperature {{ getAvg(temperatures) }} ºC</v-card-subtitle
        >
      </div>
      <v-btn
        :icon="showChart ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @click="toggleShowChart"
        style="box-shadow: none"
      ></v-btn>
    </div>
    <v-expand-transition>
      <div v-if="showChart">
        <WeatherChart
          :chart-data="temperatures"
          :chart-labels="hours"
          :y-axis-at-cero="false"
        />
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import { getAvg, hours } from "../../lib/utils";
import WeatherChart from "../charts/WeatherChart.vue";

export default defineComponent({
  name: "DayWeekCard",
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
