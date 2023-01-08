import { createWebHistory, createRouter } from "vue-router";
import PostsPage from "@/views/posts/PostsPage.vue";
import UkraineMap from "@/views/ukraine-map/UkraineMap.vue";

const routes = [
  {
    path: "/",
    component: PostsPage,
  },
  {
    path: "/posts",
    component: PostsPage,
  },
  {
    path: "/ukraine-map",
    component: UkraineMap,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;