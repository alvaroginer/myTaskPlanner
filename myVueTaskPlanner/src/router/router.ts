import { createWebHistory, createRouter } from "vue-router";
import Home from "../pages/Home.vue";
import Landing from "../pages/Landing.vue";
import LogIn from "../pages/Log.vue";
import SignUp from "../pages/Signup.vue";
import WeatherSite from "../components/sites/WeatherSite.vue";
import TaskSite from "../components/sites/TaskSite.vue";
import SingleTask from "../components/cards/SingleTaskCard.vue";

const routes = [
  { path: "/", component: Landing },
  {
    path: "/home",
    component: Home,
    children: [
      {
        path: "",
        name: "tasks",
        component: TaskSite,
      },
      {
        path: "task/:id",
        name: "one-task",
        component: SingleTask,
      },
      {
        path: "weather",
        name: "weather",
        component: WeatherSite,
      },
    ],
  },
  { path: "/signup", component: SignUp },
  { path: "/login", component: LogIn },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
