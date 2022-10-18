import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "../views/DashboardView.vue";
import CandidatesView from "../views/CandidatesView.vue";
import SingleCandidateView from "../views/SingleCandidateView.vue";
import CategoriesView from "../views/CategoriesView.vue";
import SingleCategoryView from "../views/SingleCategoryView.vue";
import QuizView from "../views/QuizView.vue";
import QuizResultsView from "../views/QuizResultsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardView,
    },
    {
      path: "/candidates",
      name: "candidates",
      component: CandidatesView,
    },
    {
      path: "/candidates/:id",
      name: "singleCandidate",
      component: SingleCandidateView,
    },
    {
      path: "/categories",
      name: "сategories",
      component: CategoriesView,
    },
    {
      path: "/categories/:title",
      name: "singleCategory",
      component: SingleCategoryView,
    },
    {
      path: "/quiz",
      name: "quiz",
      component: QuizView,
    },
    {
      path: "/results",
      name: "quizResults",
      component: QuizResultsView,
    },
  ],
});

export default router;
