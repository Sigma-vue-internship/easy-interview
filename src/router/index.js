import { createRouter, createWebHistory } from "vue-router";
import { authGuard } from "@auth0/auth0-vue";
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
const router = createRouter({
  routes: [
    {
      path: "/",
      name: "hero",
      component: HeroView,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardView,
      beforeEnter: authGuard,
    },
    {
      path: "/statistics",
      name: "statistics",
      component: StatisticsView,
      beforeEnter: authGuard,
    },

    {
      path: "/candidates",
      name: "candidates",
      component: CandidatesListView,
      beforeEnter: authGuard,
    },
    {
      path: "/candidates/:id",
      name: "candidate",
      component: CandidateView,
      beforeEnter: authGuard,
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
      beforeEnter: authGuard,
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
      beforeEnter: authGuard,
    },
    {
      path: "/results",
      name: "quizResults",
      component: QuizResultsView,
      beforeEnter: authGuard,
    },
    {
      path: "/candidates/:candidateId/results/:resultId",
      name: "singleResult",
      component: SingleResultView,
      beforeEnter: authGuard,
    },
    {
      path: "/constructor",
      name: "quizConstructor",
      component: QuizConstructorView,
      beforeEnter: authGuard,
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
