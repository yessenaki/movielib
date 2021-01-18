<template>
  <footer>
    <div class="wrap">
      <div class="footer-content">
        <div class="tmdb">
          <a href="https://themoviedb.org" target="_blank">
            <img src="../assets/img/icons/tmdb.svg" alt="The Movie DB">
          </a>
        </div>
        <p class="tmdb-info">This website uses the TMDb API</p>
      </div>
    </div>
  </footer>
</template>

<style>
footer {
  background: #7e0046;
  background: -webkit-gradient(linear, left top, right top, from(#7e0046), to(#a91f49));
  background: linear-gradient(to right, #7e0046, #a91f49);
  margin-top: 3rem;
  padding: 2rem 0;
}

.footer-content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
}

.tmdb {
  max-width: 6rem;
  margin-right: 20px;
}

.tmdb-info {
  margin: 5px 0;
  font-size: 1rem;
  color: #fff;
  opacity: 0.9;
}
</style>