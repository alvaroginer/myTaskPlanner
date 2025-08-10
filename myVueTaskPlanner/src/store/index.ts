import type { VuexUser } from "../lib/definitions";
import { createStore } from "vuex";
import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

export const store = createStore({
  state(): { userData: VuexUser | null } {
    return {
      userData: {
        email: "",
        id: "",
        firstName: "",
        lastName: "",
      },
    };
  },
  actions,
  mutations,
  getters,
});
