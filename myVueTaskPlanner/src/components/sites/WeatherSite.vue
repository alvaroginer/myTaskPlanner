<template>
  <div>
    <Select
      v-model="selectOption"
      id="weatherSelect"
      :options="['Valencia', 'Reykjavik', 'La Virgen de la Vega']"
    ></Select>
  </div>
  <div v-if="weatherData" class="container">
    <div style="flex: 1">
      <DayWeekCard
        v-for="(dayWeather, index) in weatherData"
        :key="index"
        :date="index"
        :temperatures="dayWeather"
      />
    </div>
    <div style="flex: 1">
      <WeatherChart
        v-if="weekTemperatureAvg"
        :chart-data="weekTemperatureAvg"
        :chart-labels="Object.keys(weatherData)"
      />
    </div>
  </div>

  <p v-else>Loading...</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { fetchWeatherData } from '../../lib/api';
import { getAvg } from '../../lib/utils';
import DayWeekCard from '../cards/DayWeekCard.vue';
import WeatherChart from '../charts/WeatherChart.vue';
import Select from '../select/Select.vue';

export default defineComponent({
  name: 'WeatherSite',
  components: {
    DayWeekCard,
    WeatherChart,
    Select,
  },
  data() {
    return {
      weatherData: null as Record<string, number[]> | null,
      selectOption: '' as string,
    };
  },

  computed: {
    weekTemperatureAvg() {
      if (!this.weatherData) return null;
      const allTemperatures = Object.values(this.weatherData);
      const dailyAvgTemperature = allTemperatures.map((dayTemperatures) =>
        getAvg(dayTemperatures)
      );
      return dailyAvgTemperature;
    },
  },

  async mounted() {
    const res = await fetchWeatherData(this.selectOption);

    if (res) {
      this.weatherData = res;
    }
  },
});
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
