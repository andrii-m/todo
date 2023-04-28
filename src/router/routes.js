import { LAYOUT_NAMES } from "@/helpers/rout-constants";

export const APP_ROUTES = {
  LOGIN: {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView"),
    meta: {
      layout: LAYOUT_NAMES.AUTH,
    },
  },
  TODO: {
    path: "/",
    name: "todo",
    component: () => import("@/views/TodoView"),
    meta: {
      layout: LAYOUT_NAMES.DEFAULT,
      requiresAuth: true,
    },
  },
  NOT_FOUND: {
    path: "*",
    name: "404",
    component: () => import("@/views/NotFoundView"),
    meta: {
      layout: LAYOUT_NAMES.AUTH,
    },
  },
};
