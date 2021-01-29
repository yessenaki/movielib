import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import MovieList from './components/MovieList.vue';
import MovieDetails from './components/MovieDetails.vue';

const app = createApp(App);
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/discover/popular' },
    { path: '/discover/:type', component: MovieList, props: true },
    { path: '/movies/:id', component: MovieDetails, props: true },
    { path: '/genres/:genreId', component: MovieList, props: true }
  ]
});

app.use(router);

app.mount('#app');