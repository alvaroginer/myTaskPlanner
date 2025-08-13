<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import CardContainer from '../components/CardContainer.vue';
//Faltan los imports

//deinir aquí onAuthStateChanged
// onMounted(() => {
//   const store = useStore();
//   onAuthStateChanged(getAuth(), (firebaseUser) => {
//     if (firebaseUser) {
//       return
//     } else {
//       store.logOut();
//     }
//   });
// });
</script>

<template>
  <main class="dashboard">
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
