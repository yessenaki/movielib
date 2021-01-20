<template>
  <main>
    <div class="wrap">
      <div class="movie-sort" v-if="type === 'popular'">
        <div class="movie-filters-wrap">
          <span class="current-movie-filter" @click="toggleFilters">{{ currentFilterTitle }}</span>
          <ul class="movie-filters" v-if="filtersAreVisible" @click="changeFilter">
            <li v-if="currentFilter !== 'popularity'" data-filter="popularity">Popularity</li>
            <li v-if="currentFilter !== 'original_title'" data-filter="original_title">Title</li>
            <li v-if="currentFilter !== 'revenue'" data-filter="revenue">Revenue</li>
            <li v-if="currentFilter !== 'release_date'" data-filter="release_date">Release date</li>
            <li v-if="currentFilter !== 'vote_average'" data-filter="vote_average">Vote average</li>
            <li v-if="currentFilter !== 'vote_count'" data-filter="vote_count">Vote count</li>
          </ul>
        </div>
        <div>
          <i class="arrow-symbol" @click="changeSort">{{ this.sort === 'desc' ? '&#8595;' : '&#8593;' }}</i>
        </div>
      </div>
      <div class="movie-list">
        <MovieListItem :movies="movies" />
      </div>
      <div class="load-more" @click="getMovies(type)">Load more</div>
    </div>
  </main>
</template>

<script>
import MovieListItem from './MovieListItem';

export default {
  name: 'MovieList',
  components: {
    MovieListItem
  },
  props: ['type'],
  inject: ['apiKey', 'apiConfig', 'genres'],
  data() {
    return {
      movies: [],
      page: 1,
      sort: 'desc',
      currentFilter: 'popularity',
      currentFilterTitle: 'Popularity',
      filtersAreVisible: false
    };
  },
  watch: {
    type(value) {
      this.movies = [];
      this.page = 1;
      this.getMovies(value);
    }
  },
  methods: {
    changeFilter(event) {
      this.currentFilterTitle = event.target.innerText;
      this.currentFilter = event.target.getAttribute('data-filter');
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
    async getMovies(type) {
      let response = null;
      if (type === 'trending') {
        response = await fetch(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=${this.apiKey}&page=${this.page}`
        );
      } else if (type === 'top-rated') {
        response = await fetch(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${this.apiKey}&page=${this.page}`
        );
      } else if (type === 'now-playing') {
        response = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${this.apiKey}&page=${this.page}`
        );
      } else if (type === 'upcoming') {
        response = await fetch(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${this.apiKey}&page=${this.page}`
        );
      } else {
        let sortBy = `${this.currentFilter}.${this.sort}`;
        let url = `https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&language=en-US`;
        url += `&certification_country=US&certification.lte=R&sort_by=${sortBy}&page=${this.page}`;
        response = await fetch(url);
      }

      const data = await response.json();
      console.log(data);
      const imageConfig = this.apiConfig.value.images;
      const imageBaseURL = imageConfig.secure_base_url + imageConfig.poster_sizes[3];

      for (let movie of data.results) {
        movie.poster_full_path = movie.poster_path ? imageBaseURL + movie.poster_path : '/static/img/no-image.png';
        movie.release_year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'unknown';
        movie.genres_string = '';

        let genreCount = movie.genre_ids.length;
        movie.genre_ids.forEach((value, index) => {
          movie.genres_string += this.genres.value.get(value);
          if (genreCount > index + 1) {
            movie.genres_string += ', ';
          }
        });

        this.movies.push(movie);
      }

      this.page++;
    }
  },
  created() {
    this.getMovies(this.type);
  }
}
</script>

<style>
main {
  margin-top: 2rem;
}

.movie-sort {
  display: flex;
  flex-direction: row-reverse;
}

.movie-filters-wrap {
  position: relative;
  cursor: pointer;
  z-index: 1;
}

.current-movie-filter {
  display: inline-block;
  padding: 5px 10px;
  color: #626262;
  font-size: 14px;
}

.movie-filters {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #a91f49;
  min-width: 170px;
  -webkit-transition: opacity 0.2s ease 0s, top 0.2s ease 0s;
  transition: opacity 0.2s ease 0s, top 0.2s ease 0s;
}

.movie-filters li {
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

.movie-filters li:hover {
  background-color: #7e0046;
}

.arrow-symbol {
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