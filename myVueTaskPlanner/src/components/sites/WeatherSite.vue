<template>
  <div>
    <DayWeekCard
      v-for="(dayWeather, index) in weatherData"
      :date="weatherData.dayWeather"
      :temperature=""
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { fetchWeatherData } from '../../lib/api';
import DayWeekCard from '../cards/DayWeekCard.vue';
type WeatherData = {
  date: string;
  temperature: number;
};

export default defineComponent({
  name: 'WeatherSite',
  components: {
    DayWeekCard,
  },
  data() {
    return {
      weatherData: null as WeatherData[] | null,
    };
  },

  async mounted() {
    const res = await fetchWeatherData();

    if (res) {
      this.weatherData = res;
    }
  },
});
</script>
