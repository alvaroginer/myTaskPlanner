import { createApp } from "vue";
import { createStore } from "vuex/types/index.js";
import type { VuexUser } from "./lib/definitions";
import "./style.css";
import App from "./App.vue";
import router from "./router/router";

const store = createStore({
  //Guardamos variables, como si fueran refs
  state(): { userData: VuexUser | null } {
    return {
      userData: {
        email: "",
        id: "",
        firstName: "",
        lastName: "",
      },
      //aquí pueden ir otras variables
    };
  },

  //Guardamos funciones que solo actualizan los state
  mutations: {
    logInUser(state, newUserData: VuexUser) {
      state.userData = newUserData;
    },

    logOut(state) {
      state.userData = null;
    },
  },

  //Aquí devolvemos valores computados, muy utilizado con arrays
  getters: {
    getUserFullName(state) {
      return `${state.userData?.firstName} ${state.userData?.lastName}`;
    },
  },
  actions: {
    async upDateUser({ commit }, userId) {
      const newUserData = await fetchUserById(userId);
      commit("logInUser", newUserData);
    },
  },
});

createApp(App).use(router).mount("#app");
