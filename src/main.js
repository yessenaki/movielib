import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import MovieList from './components/MovieList.vue';
import MovieDetails from './components/MovieDetails.vue';
import NotFound from './components/NotFound.vue';

const app = createApp(App);
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/discover/all' },
    { path: '/discover/:type', component: MovieList },
    { path: '/movies/:id', name: 'movie', component: MovieDetails, props: true },
    { path: '/genres/:genre', component: MovieList },
    { path: '/search', component: MovieList, meta: { title: 'Search' } },
    { path: '/:notFound(.*)*', component: NotFound }
  ]
});

router.beforeEach((to, from, next) => {
  let str = to.params.type || to.params.genre;
  let title = '';
  if (str && str !== 'all') {
    title = str.replaceAll('-', ' ');
    title = title.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
    title += ' - ';
  }

  if (to.meta.title) {
    title += `${to.meta.title} - `;
  }

  document.title = title + 'MovieLib';
  next();
});

app.use(router);

app.mount('#app');