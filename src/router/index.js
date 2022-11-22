import { createRouter, createWebHistory } from "vue-router";
import { authGuard } from "@auth0/auth0-vue";
import DashboardView from "../views/DashboardView.vue";
import CandidatesListView from "../views/CandidatesListView.vue";
import CandidateView from "../views/CandidateView.vue";
import CategoriesListView from "../views/CategoriesListView.vue";
import CategoryView from "../views/CategoryView.vue";
import StatisticsView from "../views/StatisticsView.vue";
import QuizView from "../views/QuizView.vue";
import QuizResultsView from "../views/QuizResultsView.vue";
import QuizConstructorView from "../views/QuizConstructorView.vue";
import SingleResultView from "../views/SingleResultView.vue";

// const guardedRoutes = [
//   "dashboard"
//   "candidates",
//   "singleCandidate",
//   "сategories",
//   "singleCategory",
//   "quiz",
//   "quizResults",
// ];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: DashboardView,
    },
    {
      path: "/quiz",
      name: "quiz",
      component: QuizView,
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
    },
    {
      path: "/categories",
      name: "categoriesList",
      component: CategoriesListView,
      beforeEnter: authGuard,
    },
    {
      path: "/categories/:title",
      name: "category",
      component: CategoryView,
      beforeEnter: authGuard,
    },
    {
      path: "/results",
      name: "quizResults",
      component: QuizResultsView,
      beforeEnter: authGuard,
    },
    {
      path: "/results/:id",
      name: "singleResult",
      component: SingleResultView,
      beforeEnter: authGuard,
    },
    {
      path: "/constructor",
      name: "quizConstructor",
      component: QuizConstructorView,
      beforeEnter: authGuard,
    }
  ],
});
// router.beforeEach((to, from, next) =>
//   guardedRoutes.includes(to.name) ? authGuard(to.path) : next()
// );

export default router;
