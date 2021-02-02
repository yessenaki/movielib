<template>
  <TheSpinner v-if="isLoading && page === 1" />
  <div class="container" v-else>
    <div class="movie-sort" v-if="type === 'all'">
      <div class="sort-filter">
        <span class="sort-filter__current" @click="toggleFilters">{{ currentFilterName }}</span>
        <ul class="sort-filter__list" @click="changeFilter" v-if="filtersAreVisible">
          <li class="sort-filter__item" data-filter="popularity" v-if="currentFilter !== 'popularity'">Popular</li>
          <li class="sort-filter__item" data-filter="original_title" v-if="currentFilter !== 'original_title'">Title</li>
          <li class="sort-filter__item" data-filter="revenue" v-if="currentFilter !== 'revenue'">Revenue</li>
          <li class="sort-filter__item" data-filter="release_date" v-if="currentFilter !== 'release_date'">Release</li>
          <li class="sort-filter__item" data-filter="vote_average" v-if="currentFilter !== 'vote_average'">Vote average</li>
          <li class="sort-filter__item" data-filter="vote_count" v-if="currentFilter !== 'vote_count'">Vote count</li>
        </ul>
      </div>
      <div class="sort-order">
        <i class="sort-order__direction" @click="changeSort">{{ this.sort === 'desc' ? '&#8595;' : '&#8593;' }}</i>
      </div>
    </div>
    <div class="movie-list" v-if="totalPages">
      <MovieListItem :movies="movies" />
    </div>
    <p class="nothing-found" v-else>Nothing found</p>
    <div class="load-more" @click="getMovies()" v-if="totalPages > page">Load more</div>
  </div>
</template>

<script>
import MovieListItem from './MovieListItem.vue';
import TheSpinner from './TheSpinner.vue';

export default {
  name: 'MovieList',
  components: {
    MovieListItem,
    TheSpinner
  },
  inject: ['apiConfig', 'genresWithIdKey', 'genresWithNameKey'],
  data() {
    return {
      isLoading: false,
      movies: [],
      page: 1,
      totalPages: 0,
      sort: 'desc',
      currentFilter: 'popularity',
      currentFilterName: 'Popularity',
      filtersAreVisible: false,
      type: null,
      genreId: 0,
      queryText: null
    };
  },
  watch: {
    $route(value) {
      this.movies = [];
      this.page = 1;
      this.type = null;
      this.genreId = 0;
      this.queryText = null;

      this.initializeVariables(value);
      if (this.type || this.genreId || this.queryText) {
        this.getMovies();
      }
    }
  },
  methods: {
    changeFilter(event) {
      this.currentFilterName = event.target.innerText;
      this.currentFilter = event.target.getAttribute('data-filter');
      this.filtersAreVisible = false;
      this.movies = [];
      this.page = 1;
      this.getMovies();
    },
    changeSort() {
      this.sort = this.sort === 'desc' ? 'asc' : 'desc';
      this.movies = [];
      this.page = 1;
      this.getMovies();
    },
    toggleFilters() {
      this.filtersAreVisible = !this.filtersAreVisible;
    },
    initializeVariables(route) {
      if (route.params.type) {
        this.type = route.params.type;
      }

      if (this.$route.params.genre) {
        let id = this.genresWithNameKey.value.get(route.params.genre);
        this.genreId = id;
      }

      if (route.path === '/search' && route.query.q) {
        this.queryText = this.$route.query.q;
      }
    },
    async getMovies() {
      this.isLoading = true;

      let url = 'https://api.themoviedb.org/3';
      if (this.type === 'trending') {
        url += '/trending/movie/day?';
      } else if (this.type === 'top-rated') {
        url += '/movie/top_rated?';
      } else if (this.type === 'now-playing') {
        url += '/movie/now_playing?';
      } else if (this.type === 'upcoming') {
        url += '/movie/upcoming?';
      } else if (this.genreId) {
        url += `/discover/movie?with_genres=${this.genreId}&certification_country=US&certification.lte=R&`;
      } else if (this.queryText) {
        url += `/search/movie?query=${this.queryText}&inclue_adult=false&`;
      } else {
        let sortBy = `${this.currentFilter}.${this.sort}`;
        url += `/discover/movie?sort_by=${sortBy}&certification_country=US&certification.lte=R&`;
      }

      const response = await fetch(`${url}api_key=${process.env.VUE_APP_API_KEY}&page=${this.page}`);
      const data = await response.json();
      const imageConfig = this.apiConfig.value.images;
      const imageBaseURL = imageConfig.secure_base_url + imageConfig.poster_sizes[3];

      for (let movie of data.results) {
        movie.poster_full_path = movie.poster_path ? imageBaseURL + movie.poster_path : '/static/img/no-image.png';
        movie.release_year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'unknown';
        movie.genres_string = '';

        let genreCount = movie.genre_ids.length;
        movie.genre_ids.forEach((value, index) => {
          movie.genres_string += this.genresWithIdKey.value.get(value);
          if (genreCount > index + 1) {
            movie.genres_string += ', ';
          }
        });

        this.movies.push(movie);
      }

      this.page++;
      this.totalPages = data.total_pages;
      this.isLoading = false;
    },
    handleScroll() {
      const nav = document.getElementById('nav');
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        nav.classList.add('nav_small');
      } else {
        nav.classList.remove('nav_small');
      }
    }
  },
  created() {
    this.initializeVariables(this.$route);
    this.getMovies();
    window.addEventListener('scroll', this.handleScroll);
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll);
    document.getElementById('nav').classList.remove('nav_small');
  }
}
</script>

<style>
.movie-sort {
  display: flex;
  flex-direction: row-reverse;
}

.sort-filter {
  position: relative;
  cursor: pointer;
}
.sort-filter__current {
  display: inline-block;
  padding: 5px 10px;
  color: #626262;
  font-size: 14px;
}
.sort-filter__list {
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 1;
  background-color: #a91f49;
  min-width: 170px;
  -webkit-transition: opacity 0.2s ease 0s, top 0.2s ease 0s;
  transition: opacity 0.2s ease 0s, top 0.2s ease 0s;
}
.sort-filter__item {
  display: inline-block;
  padding: 5px 10px;
  color: #fff;
  opacity: 0.9;
  font-size: 14px;
  width: 100%;
  text-decoration: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  -webkit-transition: background 0.2s ease 0s;
  transition: background 0.2s ease 0s;
}
.sort-filter__item:last-child {
  border: none;
}
.sort-filter__item:hover {
  background-color: #7e0046;
}

.sort-order__direction {
  font-size: 17px;
  color: #626262;
  cursor: pointer;
  padding: 0 10px;
}

.movie-list {
  padding-top: 2rem;
  display: grid;
  gap: 3rem 2rem;
  grid-auto-rows: auto;
  grid-template-columns: repeat(auto-fill, minmax(11rem, 14rem));
  justify-content: space-evenly;
}

.nothing-found {
  font-size: 2rem;
  color: #484848;
}

.load-more {
  background-color: #2f2f2f;
  color: #626262;
  margin-top: 3rem;
  padding: 15px;
  font-size: 1rem;
  text-align: center;
  cursor: pointer;
  text-transform: uppercase;
}
.load-more:active {
  opacity: 0.8;
}
</style>