<template>
  <div
    style="
      margin-bottom: 40px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 10px;
    "
  >
    <p>Select a location:</p>
    <v-select
      label="Locations"
      :items="locations"
      v-model="selectOption"
      @update:model-value="toggleLocation"
    ></v-select>
  </div>
  <div v-if="weatherData" class="container">
    <div style="flex: 1">
      <DayWeekCard
        v-for="date in Object.keys(weatherData)"
        :key="date"
        :date="date"
        :temperatures="weatherData[date]"
      />
    </div>
    <div style="flex: 1">
      <WeatherChart
        v-if="weekTemperatureAvg"
        :chart-data="weekTemperatureAvg"
        :chart-labels="Object.keys(weatherData)"
        :key="selectOption"
      />
    </div>
  </div>

  <p v-else>Loading...</p>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { fetchWeatherData } from "../../lib/api";
import { getAvg } from "../../lib/utils";
import DayWeekCard from "../cards/DayWeekCard.vue";
import WeatherChart from "../charts/WeatherChart.vue";
import Select from "../select/Select.vue";

export default defineComponent({
  name: "WeatherSite",
  components: {
    DayWeekCard,
    WeatherChart,
    Select,
  },
  data() {
    return {
      locations: ["Valencia", "Reykjavik", "Virgen de la Vega"] as string[],
      selectOption: "Valencia",
      weatherData: null as Record<string, number[]> | null,
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
  methods: {
    async toggleLocation() {
      const res = await fetchWeatherData(this.selectOption);
      if (!res) return null;
      this.weatherData = res;
    },
  },
  async mounted() {
    this.toggleLocation();
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
