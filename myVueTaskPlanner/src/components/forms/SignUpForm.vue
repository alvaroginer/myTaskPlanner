<template>
  <form @submit.prevent="handleSubmit">
    <InputText
      id="firstName"
      label="Introduce your name"
      placeholder="Alvaro"
      v-model="formData.firstName"
      :error-message="formDataErrors.errors.firstName"
    ></InputText>
    <InputText
      id="lastName"
      label="Introduce your last name"
      placeholder="Giner"
      v-model="formData.lastName"
      :error-message="formDataErrors.errors.lastName"
    ></InputText>
    <InputText
      id="email"
      label="Introduce your email"
      placeholder="example@mail.com"
      v-model="formData.email"
      :error-message="formDataErrors.errors.email"
    ></InputText>
    <InputText
      id="password"
      label="Introduce your password"
      placeholder="Abcd1234*"
      v-model="formData.password"
      type="password"
      :error-message="formDataErrors.errors.password"
    ></InputText>
    <button type="submit">Submit</button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { validateSignupForm } from "../../lib/validations/formValidation";
import { mapMutations } from "vuex";
import InputText from "../input/InputText.vue";

type SignUpFormErrors = {
  firstName?: string | undefined;
  lastName?: string | undefined;
  email?: string | undefined;
  password?: string | undefined;
  signup?: string | undefined;
};

export default defineComponent({
  name: "SignUpForm",
  components: InputText,
  data() {
    return {
      formData: {
        firstName: "" as string,
        lastName: "" as string,
        email: "" as string,
        password: "" as string,
      },
      formErrors: {
        succes: false as boolean,
        errors: {} as SignUpFormErrors,
      },
    };
  },
  methods: {
    ...mapMutations(["logInUser"]),
    async handleSubmit() {
      try {
        const validUser = await validateSignupForm(this.formData);

        if ("errors" in validUser) {
          this.formErrors = {
            succes: false,
            errors: validUser.errors,
          };
          return;
        }

        this.logInUser(validUser);
        console.log("Succesfull log in");
        this.$router.push("/home");
      } catch (error: any) {
        this.formErrors = {
          succes: false,
          errors: {
            signup:
              "Ocurrió un error con el inicio de sesión. Inténtelo otra vez",
          },
        };
      }
    },
  },
});
</script>
