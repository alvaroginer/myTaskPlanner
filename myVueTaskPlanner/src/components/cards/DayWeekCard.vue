<template>
  <div>
    <h4>{{ dateInfo }}</h4>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { generateDayString } from '../../lib/utils';

export default defineComponent({
  name: 'DayWeekCard',
  props: {
    date: { type: Number as () => number, required: true },
    temperature: { type: Number as () => number, required: true },
  },
  computed: {
    dateInfo(): string {
      return generateDayString(this.date);
    },
  },
});
</script>

<style></style>
