import type { VuexStore } from "../lib/definitions";

export default {
  getUserFullName(state: VuexStore) {
    return `${state.userData?.firstName} ${state.userData?.lastName}`;
  },
};
