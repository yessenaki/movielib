<template>
  <header>
    <div class="wrap">
      <div class="header-content">
        <div class="home-link">
          <router-link to="/">MovieLib</router-link>
        </div>
        <nav>
          <ul class="menu" :style="menuIsVisible">
            <li>
              <router-link to="/movies/trending">Trending</router-link>
            </li>
            <li>
              <router-link to="/movies/top-rated">Top Rated</router-link>
            </li>
            <li>
              <router-link to="/movies/now-playing">Now Playing</router-link>
            </li>
            <li>
              <router-link to="/movies/upcoming">Upcoming</router-link>
            </li>
          </ul>
        </nav>
        <i class="hamburger-icon" @click="toggleMenu"></i>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'TheHeader',
  data() {
    return {
      isVisible: false
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
    }
  }
}
</script>

<style>
header {
  background: #7e0046;
  background: -webkit-gradient(linear, left top, right top, from(#7e0046), to(#a91f49));
  background: linear-gradient(to right, #7e0046, #a91f49);
  padding: 1.5rem 0;
}

.header-content {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.home-link a {
  font-size: 1.7rem;
  font-weight: 700;
  padding-right: 60px;
}

.menu > li {
  display: inline-block;
  text-transform: uppercase;
  font-size: 1rem;
  margin-right: 20px;
}

.hamburger-icon {
  background: url("../assets/img/icons/hamburger.png") no-repeat;
  width: 32px;
  height: 25px;
  position: absolute;
  top: 4px;
  right: 0;
  display: none;
  cursor: pointer;
}
</style>