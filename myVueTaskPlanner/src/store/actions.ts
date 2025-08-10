import type { Commit } from "vuex/types/index.js";

export default {
  async upDateUser({ commit }: { commit: Commit }, userId: string) {
    const newUserData = await fetchUserById(userId);
    commit("logInUser", newUserData);
  },
};
