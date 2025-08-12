<template>
  <div class="glass-effect">
    <p>Day: {{ dateInfo.day }} at {{ dateInfo.hour }}</p>
    <p>
      Temperature: {{ temperature }}ºC - Thermal Sensation:
      {{ thermalSensation }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

type DateInfoData = {
  hour: number;
  day: string;
};

export default defineComponent({
  name: 'WeatherCard',
  props: {
    date: {
      type: String as () => string,
      required: true,
    },
    temperature: {
      type: Number as () => number,
      required: true,
    },
  },

  computed: {
    dateInfo(): DateInfoData {
      const validDate = new Date(this.date);
      const validDay = validDate.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      const validHour = validDate.getHours();

      return { hour: validHour, day: validDay };
    },
    thermalSensation(): string {
      let sensation: string;
      switch (true) {
        case this.temperature <= 10:
          sensation = 'Cold';
          break;
        case this.temperature <= 24:
          sensation = 'Pleasant';
          break;
        case this.temperature > 24:
          sensation = 'Hot';
          break;
        default:
          sensation = 'Unknown';
      }
      return sensation;
    },
  },
});
</script>

<style scoped>
.container {
  width: 100px;
  height: 50px;
  border: 1px solid gray;
}
</style>
