<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__content">
        <div class="tmdb">
          <a href="https://themoviedb.org" class="tmdb__link" target="_blank">
            <img src="../assets/img/icons/tmdb.svg" class="tmdb__icon" alt="The Movie DB">
          </a>
        </div>
        <p class="footer__info">This product uses the TMDB API</p>
      </div>
    </div>
  </footer>
</template>

<style>
.footer {
  background: -webkit-gradient(linear, left top, right top, from(#7e0046), to(#a91f49));
  background: linear-gradient(to right, #7e0046, #a91f49);
  margin-top: 3rem;
  padding: 2rem 0;
  flex-shrink: 0;
}

.footer__content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
}

.tmdb {
  max-width: 6rem;
  margin-right: 20px;
}

.footer__info {
  margin: 5px 0;
  font-size: 1rem;
  color: #fff;
  opacity: 0.9;
}
</style>