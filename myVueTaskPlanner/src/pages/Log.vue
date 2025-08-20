<template>
  <div style="width: 500px">
    <LoginForm />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import LoginForm from "../components/forms/LoginForm.vue";

export default defineComponent({
  name: "Log",
  components: { LoginForm },
});
</script>

<style></style>
