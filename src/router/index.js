import { createRouter, createWebHistory } from "vue-router";
import { authGuard } from "@auth0/auth0-vue";
import DashboardView from "../views/DashboardView.vue";
import CandidatesView from "../views/CandidatesView.vue";
import SingleCandidateView from "../views/SingleCandidateView.vue";
import CategoriesView from "../views/CategoriesView.vue";
import SingleCategoryView from "../views/SingleCategoryView.vue";
import QuizView from "../views/QuizView.vue";
import QuizResultsView from "../views/QuizResultsView.vue";
import HomeView from "../views/HomeView.vue";

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
      name: "home",
      component: HomeView,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardView,
      beforeEnter: authGuard,
    },
    {
      path: "/candidates",
      name: "candidates",
      component: CandidatesView,
      beforeEnter: authGuard,
    },
    {
      path: "/candidates/:id",
      name: "singleCandidate",
      component: SingleCandidateView,
      beforeEnter: authGuard,
    },
    {
      path: "/categories",
      name: "сategories",
      component: CategoriesView,
      beforeEnter: authGuard,
    },
    {
      path: "/categories/:title",
      name: "singleCategory",
      component: SingleCategoryView,
      beforeEnter: authGuard,
    },
    {
      path: "/quiz",
      name: "quiz",
      component: QuizView,
      beforeEnter: authGuard,
    },
    {
      path: "/results",
      name: "quizResults",
      component: QuizResultsView,
      beforeEnter: authGuard,
    },
  ],
});
// router.beforeEach((to, from, next) =>
//   guardedRoutes.includes(to.name) ? authGuard(to.path) : next()
// );

export default router;
