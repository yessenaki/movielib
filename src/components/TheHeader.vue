<template>
  <header class="header">
    <nav class="nav" id="nav">
      <div class="container">
        <div class="nav__content">
          <div class="nav__home">
            <router-link class="nav__home-link" to="/">MovieLib</router-link>
          </div>
          <ul class="nav__list" :style="menuIsVisible">
            <li class="nav__item">
              <router-link to="/discover/trending">Trending</router-link>
            </li>
            <li class="nav__item">
              <router-link to="/discover/top-rated">Top Rated</router-link>
            </li>
            <li class="nav__item">
              <router-link to="/discover/now-playing">Now Playing</router-link>
            </li>
            <li class="nav__item">
              <router-link to="/discover/upcoming">Upcoming</router-link>
            </li>
          </ul>
          <i class="icon-hamburger" @click="toggleMenu"></i>
        </div>
      </div>
    </nav>
    <div class="search">
      <div class="container">
        <form class="search__form" @submit.prevent="search">
          <i class="icon-search"></i>
          <input type="text" class="search__input" placeholder="Search" v-model="query">
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'TheHeader',
  data() {
    return {
      isVisible: false,
      query: ''
    };
  },
  computed: {
    menuIsVisible() {
      return {display: this.isVisible ? 'block' : ''};
    }
  },
  methods: {
    toggleMenu() {
      this.isVisible = !this.isVisible;
    },
    search() {
      this.$router.push({ path: '/search', query: { q: this.query } });
      this.query = '';
    }
  }
}
</script>

<style>
.header {
  width: 100%;
  position: fixed;
  z-index: 2;
}

.nav {
  background: -webkit-gradient(linear, left top, right top, from(#7e0046), to(#a91f49));
  background: linear-gradient(to right, #7e0046, #a91f49);
  padding: 1.5rem 0;
  -webkit-transition: opacity 0.7s ease 0.1s, padding-top 0.2s ease 0s, padding-bottom 0.2s ease 0s;
  transition: opacity 0.7s ease 0.1s, padding-top 0.2s ease 0s, padding-bottom 0.2s ease 0s;
}
.nav_small {
  padding: 0.7rem 0;
  opacity: 0.97;
}

.nav__content {
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
}

.nav__home {
  width: 13rem;
}

.nav__home-link {
  font-size: 27px;
  font-weight: 700;
}

.nav__item {
  display: inline-block;
  text-transform: uppercase;
  font-size: 1rem;
  margin-right: 2rem;
}

.icon-hamburger {
  background-image: url("../assets/img/icons/hamburger.png");
  background-repeat: no-repeat;
  background-size: 30px 24px;
  width: 30px;
  height: 24px;
  position: absolute;
  top: 6px;
  right: 0;
  display: none;
  cursor: pointer;
}

.search {
  background-color: #2f2f2f;
  -webkit-box-shadow: 0 0 70px 0 rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 70px 0 rgba(0, 0, 0, 0.3);
}

.search__form {
  position: relative;
}

.search__input {
  width: 100%;
  background-color: transparent;
  padding: 12px 30px;
  border: none;
  font-size: 1.2rem;
  color: #989898;
  outline: none;
}

.icon-search {
  position: absolute;
  top: 1rem;
  left: 0;
  width: 20px;
  height: 20px;
  background: url("../assets/img/icons/search.png") no-repeat;
  opacity: 0.5;
  -webkit-transition: left 0.2s ease 0s;
  transition: left 0.2s ease 0s;
}

@media (max-width: 768px) {
  .nav__content {
    flex-direction: column;
    align-items: flex-start;
  }

  .nav__home {
    width: auto;
  }

  .nav__list {
    display: none;
  }

  .nav__item {
    display: block;
    margin-top: 0.9rem;
    margin-right: 0;
  }

  .icon-hamburger {
    display: block;
  }
}
</style>