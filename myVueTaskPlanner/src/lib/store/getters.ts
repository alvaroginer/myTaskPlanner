import type { VuexStore } from "../definitions";

export default {
  getUserFullName(state: VuexStore) {
    return `${state.userData?.firstName} ${state.userData?.lastName}`;
  },
};
