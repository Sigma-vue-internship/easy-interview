import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "../views/DashboardView.vue";
import CandidatesListView from "../views/CandidatesListView.vue";
import CandidateView from "../views/CandidateView.vue";
import CategoriesListView from "../views/CategoriesListView.vue";
import QuestionsListView from "../views/QuestionsListView.vue";
import StatisticsView from "../views/StatisticsView.vue";
import QuizResultsView from "../views/QuizResultsView.vue";
import QuizConstructorView from "../views/QuizConstructorView.vue";
import SingleResultView from "../views/SingleResultView.vue";
import MissingView from "../views/MissingView.vue";
import LastResultView from "../views/LastResultView.vue";
import HeroView from "../views/HeroView.vue";
import SignupView from "../views/SignupView.vue";
import LoginView from "../views/LoginView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/signup",
      name: "signup",
      component: SignupView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/",
      name: "hero",
      component: HeroView,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardView,
    },
    {
      path: "/statistics",
      name: "statistics",
      component: StatisticsView,
    },

    {
      path: "/candidates",
      name: "candidates",
      component: CandidatesListView,
    },
    {
      path: "/candidates/:id",
      name: "candidate",
      component: CandidateView,
      beforeRouteUpdate(to, from, next) {
        if (to.path !== from.path) {
          window.location = to.path;
        }
      },
    },
    {
      path: "/questions",
      name: "categoriesList",
      component: CategoriesListView,
      beforeRouteUpdate(to, from, next) {
        if (to.path !== from.path) {
          window.location = to.path;
        }
      },
    },
    {
      path: "/questions/:title",
      name: "category",
      component: QuestionsListView,
    },
    {
      path: "/results",
      name: "quizResults",
      component: QuizResultsView,
    },
    {
      path: "/candidates/:candidateId/results/:resultId",
      name: "singleResult",
      component: SingleResultView,
    },
    {
      path: "/constructor",
      name: "quizConstructor",
      component: QuizConstructorView,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: MissingView,
    },
    {
      path: "/lastresult",
      name: "lastResult",
      component: LastResultView,
    },
  ],
});

export default router;
