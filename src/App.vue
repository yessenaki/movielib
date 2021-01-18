<template>
  <TheHeader />
  <TheSearch />
  <MovieList @load-more="getMovies" />
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
  },
  data() {
    return {
      apiKey: '******',
      apiConfig: null,
      movies: [],
      genres: null,
      page: 1
    };
  },
  provide() {
    return {
      movies: this.movies,
    };
  },
  methods: {
    async getAPIConfig() {
      if (this.apiConfig) {
        return;
      }

      const response = await fetch(`https://api.themoviedb.org/3/configuration?api_key=${this.apiKey}`);
      const data = await response.json();

      this.apiConfig = data;
    },
    async getGenres() {
      if (this.genres) {
        return;
      }

      const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}`);
      const data = await response.json();

      let map = new Map();
      for (let genre of data.genres) {
        map.set(genre.id, genre.name);
      }

      this.genres = map;
    },
    async getMovies() {
      await this.getAPIConfig();
      await this.getGenres();

      const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&page=${this.page}`);
      const data = await response.json();
      const movies = data.results;
      const imageBaseURL = this.apiConfig.images.secure_base_url + this.apiConfig.images.poster_sizes[3];

      console.log(this.apiConfig);
      console.log(this.genres);
      console.log(data);

      for (let movie of movies) {
        movie.poster_full_path = imageBaseURL + movie.poster_path;
        movie.release_year = new Date(movie.release_date).getFullYear();
        movie.genres_string = '';

        let genreLength = movie.genre_ids.length;
        movie.genre_ids.forEach((value, index) => {
          movie.genres_string += this.genres.get(value);
          if (genreLength > index + 1) {
            movie.genres_string += ', ';
          }
        });

        this.movies.push(movie);
      }

      this.page++;
    }
  },
  created() {
    this.getMovies();
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

@media (max-width: 575.98px) {
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
