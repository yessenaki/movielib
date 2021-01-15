<template>
  <div class="movie-item">
    <div class="movie-poster">
      <a href="#">
        <img src="https://flox-demo.pyxl.dev/assets/poster/cjr4NWURcVN3gW5FlHeabgBHLrY.jpg" alt="">
      </a>
    </div>
    <div class="movie-info">
      <span class="year">2021</span>
      <a href="#" title="Wonder Women: 1984">Wonder Women: 1984</a>
      <span class="genre">Drama</span>
    </div>
  </div>
</template>

<style>
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