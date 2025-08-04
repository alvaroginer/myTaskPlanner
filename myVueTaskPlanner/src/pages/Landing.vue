<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="main-container">
    <h1>
      Welcome to your Vue Task Planner. Please register to start your journey
    </h1>
    <RouterLink to="/signup">Your first time? Sign up</RouterLink>
    <RouterLink to="/login">Already an account? Log in</RouterLink>
  </div>
</template>

<style scoped>
.main-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
