<template>
  <div style="width: 500px">
    <SignUpForm />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SignUpForm from "../components/forms/SignUpForm.vue";

export default defineComponent({
  name: "Signup",
  components: { SignUpForm },
});
</script>

<style></style>
