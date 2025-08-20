<script lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { defineComponent } from "vue";
import { store } from "../lib/store";
import CardContainer from "../components/CardContainer.vue";

export default defineComponent({
  name: "HomePage",
  data() {
    return {
      user: store.state.userData,
    };
  },
});
</script>

<template>
  <main class="dashboard">
    <h2>Hi there {{ user?.firstName }}</h2>
    <CardContainer />
    <div class="container">
      <div>
        <RouterLink
          class="section-title"
          :class="{ selected: $route.path === '/home' }"
          to="/home"
          >Tasks</RouterLink
        >
        <RouterLink
          class="section-title"
          :class="{ selected: $route.path === '/home/weather' }"
          to="/home/weather"
        >
          Weather</RouterLink
        >
      </div>
      <div style="background-color: azure">
        <RouterView />
      </div>
    </div>
  </main>
</template>

<style scoped>
.dashboard {
  padding: 20px;
}

.container {
  display: block;
  padding: 20px;
  border: 2px solid gray;
}

.section-title {
  text-decoration: none;
  color: black;
  margin-left: 20px;
}

.section-title:hover {
  color: blue;
  cursor: pointer;
}

.selected {
  text-decoration: underline;
}
</style>
