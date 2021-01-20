<template>
  <TheHeader />
  <TheSearch />
  <router-view v-if="apiConfig && genres"></router-view>
  <TheFooter />
</template>

<script>
import { computed } from 'vue';

import TheHeader from './components/TheHeader.vue';
import TheSearch from './components/TheSearch.vue';
import TheFooter from './components/TheFooter.vue';

export default {
  name: 'App',
  components: {
    TheHeader,
    TheSearch,
    TheFooter,
  },
  data() {
    return {
      apiKey: '******',
      apiConfig: null,
      genres: null
    };
  },
  provide() {
    return {
      apiKey: this.apiKey,
      apiConfig: computed(() => this.apiConfig),
      genres: computed(() => this.genres)
    };
  },
  methods: {
    async getAPIConfig() {
      const response = await fetch(`https://api.themoviedb.org/3/configuration?api_key=${this.apiKey}`);
      const data = await response.json();

      this.apiConfig = data;
    },
    async getGenres() {
      const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}`);
      const data = await response.json();

      let genres = new Map();
      for (let genre of data.genres) {
        genres.set(genre.id, genre.name);
      }

      this.genres = genres;
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
  font-size: 16px;
}

body {
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  background-color: #1c1c1c;
  margin: 0;
  padding: 0;
}

.wrap {
  max-width: 1290px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 15px;
  padding-right: 15px;
}

img {
  width: 100%;
  height: 100%;
  vertical-align: middle;
  object-fit: cover;
}

a {
  color: #fff;
  opacity: 0.9;
  text-decoration: none;
}

p {
  margin: 0;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

input, textarea, select {
  font-family: inherit;
}

@media (max-width: 675.98px) {
  html {
    font-size: 14px;
  }

  .header-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .home-link a {
    padding-right: 0;
  }

  .menu {
    display: none;
  }

  .menu > li {
    display: block;
    margin-top: 15px;
  }

  .hamburger-icon {
    display: block;
  }
}
</style>
