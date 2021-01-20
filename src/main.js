import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import MovieList from './components/MovieList';

const app = createApp(App);
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/movies/popular' },
    { path: '/movies/:type', component: MovieList, props: true }
  ]
});

app.use(router);

app.mount('#app');