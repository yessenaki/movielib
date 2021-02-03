<template>
  <div class="movie-item" v-for="movie in movies" :key="movie.id">
    <div class="movie-item__image-frame">
      <router-link :to="{ name: 'movie', params: { id: movie.id } }">
        <img :src="movie.poster_full_path" :alt="movie.finalTitle">
      </router-link>
    </div>
    <div class="movie-item__info">
      <span class="movie-item__year">{{ movie.release_year }}</span>
      <router-link
        :to="{ name: 'movie', params: { id: movie.id } }"
        class="movie-item__link"
        :title="movie.finalTitle"
      >{{ movie.finalTitle }}</router-link>
      <span class="movie-item__genre">{{ movie.genres_string }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovieListItem',
  props: ['movies']
}
</script>

<style>
.movie-item__image-frame {
  height: 21rem;
}
.movie-item__image-frame:hover {
  -webkit-box-shadow: 0 0 3px 3px #a91f49;
  box-shadow: 0 0 3px 3px #a91f49;
}
.movie-item__image-frame:active {
  -webkit-box-shadow: 0 0 3px 3px #7e0046;
  box-shadow: 0 0 3px 3px #7e0046;
}

.movie-item__info {
  margin-top: 1.25rem;
}

.movie-item__link {
  display: block;
  font-size: 1rem;
  color: #989898;
  text-decoration: none;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie-item__link:hover {
  color: #a91f49;
}
.movie-item__link:active {
  color: #7e0046;
}

.movie-item__year,
.movie-item__genre {
  display: block;
  font-size: 0.875rem;
  color: #626262;
}
</style>