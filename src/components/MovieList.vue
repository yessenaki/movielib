<template>
  <main>
    <div class="wrap">
      <div class="movie-selection">
        <div class="movie-filters">
          <span>Title</span>
          <ul class="filter-list">
            <li>Last seen</li>
            <li>Own rating</li>
            <li>Release</li>
            <li>TMDb rating</li>
            <li>IMDb rating</li>
          </ul>
        </div>
        <div class="movie-sorting">
          <i class="sort-arrow">&#8593;</i>
          <!-- <i>&#8595;</i> -->
        </div>
      </div>
      <div class="movie-list">
        <MovieListItem />
      </div>
      <div class="load-more" @click="$emit('load-more')">Load more</div>
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
  emits: ['load-more']
}
</script>

<style>
.movie-selection {
  display: flex;
  flex-direction: row-reverse;
  margin-top: 2rem;
}

.movie-filters {
  position: relative;
  cursor: pointer;
  z-index: 1;
}

.movie-filters span {
  display: inline-block;
  padding: 5px 10px;
  color: #626262;
  font-size: 14px;
}

.filter-list {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #a91f49;
  min-width: 170px;
  visibility: hidden;
  -webkit-transition: opacity 0.2s ease 0s, top 0.2s ease 0s;
  transition: opacity 0.2s ease 0s, top 0.2s ease 0s;
}

.filter-list:hover {
  visibility: visible;
}

.filter-list li {
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

.filter-list li:hover {
  background-color: #7e0046;
}

.sort-arrow {
  font-size: 17px;
  color: #626262;
  cursor: pointer;
  padding: 0 10px;
}

.movie-list {
  margin-top: 2rem;
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