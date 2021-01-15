<template>
  <TheHeader />
  <TheSearch />
  <MovieList />
  <TheFooter />
</template>

<script>
import TheHeader from './components/TheHeader.vue';
import TheSearch from './components/TheSearch.vue';
import TheFooter from './components/TheFooter.vue';
import MovieList from './components/MovieList.vue';

export default {
  name: 'App',
  components: {
    TheHeader,
    TheFooter,
    TheSearch,
    MovieList
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

@media (max-width: 575.98px) {
  html {
    font-size: 14px;
  }

  .header-content {
    flex-direction: column;
    align-items: flex-start;
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
