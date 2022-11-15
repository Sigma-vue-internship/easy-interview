import { createRouter, createWebHistory } from "vue-router";
import { authGuard } from "@auth0/auth0-vue";
import DashboardView from "../views/DashboardView.vue";
import CandidatesListView from "../views/CandidatesListView.vue";
import CandidateView from "../views/CandidateView.vue";
import CategoriesListView from "../views/CategoriesListView.vue";
import CategoryView from "../views/CategoryView.vue";
import QuizView from "../views/QuizView.vue";
import QuizResultsView from "../views/QuizResultsView.vue";
import HomeView from "../views/HomeView.vue";
import QuizConstructorView from "../views/QuizConstructorView.vue";

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
      name: "сategoriesList",
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
    {
      path: "/constructor",
      name: "quizConstructor",
      component: QuizConstructorView,
      beforeEnter: authGuard,
    },
  ],
});
// router.beforeEach((to, from, next) =>
//   guardedRoutes.includes(to.name) ? authGuard(to.path) : next()
// );

export default router;
