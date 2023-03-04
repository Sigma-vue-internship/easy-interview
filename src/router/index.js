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
import SingInView from "../views/SingInView.vue";
import LoginView from "../views/LoginView.vue";
import { useUsersStore } from "../stores/users";

const notSecuredRoutes = ["singIn", "login", "hero", "dashboard"];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
      path: "/results/:resultId",
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
    {
      path: "/registration",
      name: "singIn",
      component: SingInView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUsersStore();
  try {
    if (!notSecuredRoutes.includes(to.name)) {
      await userStore.validationUser();
      userStore.isAuthenticated = true;
    }
    if (!notSecuredRoutes.includes(to.name) && !userStore.isAuthenticated) {
      Notify.failure("Please, login first");
      next({ name: "login" });
    } else {
      next();
    }
  } catch (e) {
    userStore.isAuthenticated = false;
    next({ name: "login" });
    useError(e);
  }
});

export default router;
