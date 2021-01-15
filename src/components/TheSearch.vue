<template>
  <section class="search">
    <div class="wrap">
      <div class="search-content">
        <form>
          <i class="search-icon"></i>
          <input type="text" class="search-input" placeholder="Search">
        </form>
      </div>
    </div>
  </section>
</template>

<style>
.search-content {
  position: relative;
}

.search {
  background-color: #2f2f2f;
  -webkit-box-shadow: 0 0 70px 0 rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 70px 0 rgba(0, 0, 0, 0.3);
}

.search-input {
  width: 100%;
  background-color: transparent;
  padding: 12px 30px;
  border: none;
  font-size: 1.2rem;
  color: #989898;
  outline: none;
}

.search-icon {
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
</style>
