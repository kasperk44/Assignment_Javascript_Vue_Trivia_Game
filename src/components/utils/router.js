import Start from "../views/StartView.vue";
import Questions from "../views/QuestionsView.vue";
import Result from "../views/ResultView.vue";
import { createRouter, createWebHistory } from "vue-router";
const routes = [
    {
      path: "/",
      component: Start,
    },
    {
      path: "/questions",
      component: Questions,
    },
    {
        path: "/result",
        component: Result,
      }
  ];
  
  export default createRouter({
    history: createWebHistory(),
    routes,
  });