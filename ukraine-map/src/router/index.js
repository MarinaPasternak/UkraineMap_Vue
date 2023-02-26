import Vue from 'vue';
import VueRouter from 'vue-router';
import PostsPage from '../views/posts-page/PostsPage.vue';
import UkraineMapPage from '../views/map-page/UkraineMapPage.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'posts',
        component: PostsPage
    }, {
        path: '/posts',
        name: 'posts',
        component: PostsPage
    }, {
        path: '/ukraine-map',
        name: 'ukraine-map',
        component: UkraineMapPage
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;