<template>
  <form @submit.prevent="handleSubmit">
    <InputText
      id="email"
      label="Introduce your email"
      placeholder="example@gmail.com"
      v-model="formData.email"
      :error-message="formDataErrors.errors.email"
    ></InputText>
    <InputText
      id="password"
      label="Introduce your password"
      placeholder="Abcd123*"
      v-model="formData.password"
      :error-message="formDataErrors.errors.password"
    ></InputText>
    <button type="submit">Submit</button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { validateLoginForm } from "../../lib/validations/formValidation";
import { mapMutations } from "vuex";
import InputText from "../input/InputText.vue";

type LoginFormErrors = {
  email?: string | undefined;
  password?: string | undefined;
  login?: string | undefined;
};

export default defineComponent({
  name: "LoginForm",
  components: {
    InputText,
  },
  data() {
    return {
      formData: {
        email: "" as string,
        password: "" as string,
      },
      formDataErrors: {
        succes: false as boolean,
        errors: {} as LoginFormErrors,
      },
    };
  },
  methods: {
    ...mapMutations(["logInUser"]),
    async handleSubmit() {
      try {
        const validUser = await validateLoginForm(this.formData);

        if ("errors" in validUser) {
          this.formDataErrors = {
            succes: false,
            errors: validUser.errors,
          };
          return;
        }

        this.logInUser(validUser);
        console.log("Succesfull log in");
        this.$router.push("/home");
      } catch (error: any) {
        this.formDataErrors = {
          succes: false,
          errors: {
            login:
              "Ocurrió un error con el inicio de sesión. Inténtelo otra vez",
          },
        };
      }
    },
  },
});
</script>
