<template>
  <div class="movie-item" v-for="movie in movies" :key="movie.id">
    <div class="movie-poster">
      <a href="#">
        <img :src="movie.poster_full_path" :alt="movie.title">
      </a>
    </div>
    <div class="movie-info">
      <span class="year">{{ movie.release_year }}</span>
      <a href="#" :title="movie.title">{{ movie.title }}</a>
      <span class="genre">{{ movie.genres_string }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovieListItem',
  inject: ['movies']
}
</script>

<style>
.movie-poster {
  height: 21rem;
}

.movie-poster:hover {
  -webkit-box-shadow: 0 0 3px 3px #a91f49;
  box-shadow: 0 0 3px 3px #a91f49;
}

.movie-poster:active {
  -webkit-box-shadow: 0 0 3px 3px #7e0046;
  box-shadow: 0 0 3px 3px #7e0046;
}

.movie-info {
  margin-top: 1.25rem;
}

.movie-info a {
  display: block;
  font-size: 1rem;
  color: #989898;
  text-decoration: none;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.movie-info a:hover {
  color: #a91f49;
}

.movie-info a:active {
  color: #7e0046;
}

.movie-info span {
  display: block;
  font-size: 0.875rem;
  color: #626262;
}
</style>