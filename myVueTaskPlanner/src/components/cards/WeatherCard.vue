<script setup lang="ts">
type WeatherData = {
  date: string;
  temperature: number;
};
const { date, temperature } = defineProps<WeatherData>();
</script>
