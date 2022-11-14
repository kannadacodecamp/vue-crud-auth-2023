import { createRouter, createWebHistory } from "vue-router";
import { useCookies } from "@vueuse/integrations/useCookies";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/users",
      name: "users",
      meta: { requiresAuth: true },
      component: () => import("../views/UsersView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((route) => route.meta && route.meta.requiresAuth)) {
    if (useCookies().get("auth_token") === undefined && to.path !== "/login") {
      next({ name: "login" });
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
