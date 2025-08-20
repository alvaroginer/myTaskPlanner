import type { VuexUser } from "../definitions";
import { createStore } from "vuex";
import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

export const store = createStore({
  state(): { userData: VuexUser | null } {
    const stored = localStorage.getItem("userData");
    return {
      userData: stored ? JSON.parse(stored) : null,
    };
  },
  actions,
  mutations,
  getters,
});
