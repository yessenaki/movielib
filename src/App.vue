<template>
  <TheHeader />
  <main class="main">
    <router-view v-if="apiConfig && genresWithIdKey"></router-view>
  </main>
  <TheFooter />
</template>

<script>
import { computed } from 'vue';

import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue';

export default {
  name: 'App',
  components: {
    TheHeader,
    TheFooter,
  },
  data() {
    return {
      apiConfig: null,
      genresWithIdKey: null,
      genresWithNameKey: null
    };
  },
  provide() {
    return {
      apiConfig: computed(() => this.apiConfig),
      genresWithIdKey: computed(() => this.genresWithIdKey),
      genresWithNameKey: computed(() => this.genresWithNameKey)
    };
  },
  watch: {
    $route(value) {
      let isMovieDetails = /^\/?movies\/\w+/.test(value.path);
      if (isMovieDetails) {
        document.body.classList.add('page_details');
      } else {
        document.body.classList.remove('page_details');
      }
    }
  },
  methods: {
    async getAPIConfig() {
      const response = await fetch(`https://api.themoviedb.org/3/configuration?api_key=${process.env.VUE_APP_API_KEY}`);
      const data = await response.json();

      this.apiConfig = data;
    },
    async getGenres() {
      const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.VUE_APP_API_KEY}`);
      const data = await response.json();

      let genresWithIdKey = new Map();
      let genresWithNameKey = new Map();
      for (let genre of data.genres) {
        genresWithIdKey.set(genre.id, genre.name);
        
        let name = genre.name.toLowerCase().replaceAll(' ', '-');
        genresWithNameKey.set(name, genre.id);
      }

      this.genresWithIdKey = genresWithIdKey;
      this.genresWithNameKey = genresWithNameKey;
    }
  },
  created() {
    this.getAPIConfig();
    this.getGenres();
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');
* {
  box-sizing: border-box;
}

html {
  height: 100%;
  font-size: 16px;
}

body {
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  background-color: #1c1c1c;
  margin: 0;
  height: 100%;
}

.page_details .header {
  position: absolute;
}
.page_details .nav {
  background: transparent;
}
.page_details .search {
  background-color: transparent;
  box-shadow: none;
}
.page_details .main {
  padding-top: 0;
}

.modal_open {
  overflow: hidden;
}

#app {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.container {
  max-width: 1290px;
  margin: 0 auto;
  padding: 0 15px;
}
.container_full-height {
  height: 100%;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  vertical-align: middle;
}

a {
  color: #fff;
  opacity: 0.9;
  text-decoration: none;
}

p,
h1,
h2,
h3 {
  margin: 0;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

input,
textarea,
select {
  font-family: inherit;
}

.main {
  flex: 1 0 auto;
  padding-top: 10.5rem;
}

@media (max-width: 578px) {
  html {
    font-size: 14px;
  }
}
</style>
