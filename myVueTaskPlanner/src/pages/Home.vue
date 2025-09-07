<script lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { defineComponent } from "vue";
import { store } from "../lib/store";
import CardContainer from "../components/CardContainer.vue";
import DataTable from "../components/tables/DataTable.vue";

export default defineComponent({
  name: "HomePage",
  components: {
    CardContainer,
    DataTable,
  },
  data() {
    return {
      user: store.state.userData,
    };
  },
});
</script>

<template>
  <main class="dashboard">
    <h2 style="margin-bottom: 50px">Hi there {{ user?.firstName }}</h2>
    <Suspense>
      <!-- Contenido principal -->
      <template #default>
        <DataTable />
      </template>

      <!-- Fallback mientras se carga -->
      <template #fallback>
        <v-skeleton-loader type="table" class="my-4"></v-skeleton-loader>
      </template>
    </Suspense>

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
      <div style="background-color: #f5f5f5">
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
