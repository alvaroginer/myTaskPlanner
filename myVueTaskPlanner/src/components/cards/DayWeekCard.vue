<template>
  <div class="glass-card temp-container">
    <div>
      <h4>Date: {{ date }}</h4>
      <p>Avg. Temperature {{ getAvg(temperatures) }} ºC</p>
    </div>
    <RouterLink to="">Open Tab</RouterLink>
  </div>
  <RouterView />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import { getAvg } from '../../lib/utils';
import { RouterLink, RouterView } from 'vue-router';

export default defineComponent({
  name: 'DayWeekCard',
  props: {
    date: { type: String as () => string, required: true },
    temperatures: { type: Array as PropType<number[]>, required: true },
  },
  methods: {
    getAvg,
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
