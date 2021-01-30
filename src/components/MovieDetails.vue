<template>
  <ModalDialog :title="title" :trailer="trailer" @close="closeTrailer" :is-visible="modalIsVisible" />
  <div class="movie-data" v-if="movie">
    <div class="movie-data__background" :style="backdropPath"></div>
    <div class="movie-data__foreground">
      <div class="container container_full-height">
        <div class="movie-data__content">
          <div class="movie-data__image-frame">
            <img class="movie-data__image" :src="posterPath" :alt="title">
          </div>
          <div class="movie-data__main">
            <div class="movie-detail">
              <span class="movie-detail__year">{{ releaseYear }}</span>
              <h2 class="movie-detail__title">{{ title }}</h2>
              <div class="movie-genre">
                <router-link
                  class="movie-genre__link"
                  v-for="genre in movie.genres"
                  :key="genre.id"
                  :to="`/genres/${genre.name.toLowerCase().replaceAll(' ', '-')}`"
                >{{ genre.name }}</router-link>
              </div>
            </div>
            <div class="movie-source">
              <a
                href="#"
                class="movie-source__link movie-source__link_trailer"
                @click.prevent="watchTrailer"
                v-if="trailer.key"
              >
                <i class="icon-trailer"></i>
                <span>Watch Trailer</span>
              </a>
              <a
                :href="`https://www.themoviedb.org/movie/${movie.id}`"
                class="movie-source__link movie-source__link_tmdb"
                target="_blank"
              >{{ voteAverage }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="movie-overview">
      <h2 class="movie-overview__title">Overview</h2>
      <p class="movie-overview__text">{{ overview }}</p>
    </div>
  </div>
</template>

<script>
import ModalDialog from './ModalDialog.vue';

export default {
  name: 'MovieDetails',
  components: {
    ModalDialog
  },
  props: ['id'],
  inject: ['apiKey', 'apiConfig'],
  data() {
    return {
      movie: {},
      overview: '',
      modalIsVisible: false,
      trailer: {}
    };
  },
  computed: {
    backdropPath() {
      let baseUrl = this.apiConfig.value.images.secure_base_url + this.apiConfig.value.images.backdrop_sizes[2];
      let fullPath = this.movie.backdrop_path ? `${baseUrl}${this.movie.backdrop_path}` : null;
      return { backgroundImage: `url(${fullPath})` };
    },
    posterPath() {
      let baseUrl = this.apiConfig.value.images.secure_base_url + this.apiConfig.value.images.poster_sizes[3];
      return this.movie.poster_path ? `${baseUrl}${this.movie.poster_path}` : '/static/img/no-image.png';
    },
    title() {
      return this.movie.title ? this.movie.title : this.movie.original_title;
    },
    releaseYear() {
      return this.movie.release_date ? new Date(this.movie.release_date).getFullYear() : '';
    },
    voteAverage() {
      return this.movie.vote_average ? `${this.movie.vote_average} TMDb` : 'No TMDb Rating';
    }
  },
  methods: {
    closeTrailer() {
      document.body.classList.remove('modal_open');
      this.modalIsVisible = false;
    },
    watchTrailer() {
      document.body.classList.add('modal_open');
      this.modalIsVisible = true;
    },
    findTrailer() {
      if (this.movie.videos.results.length > 0) {
        let trailer = this.movie.videos.results.find(video => {
          return video.site === 'YouTube' && video.type === 'Trailer' 
        });

        if (trailer) {
          this.trailer = trailer;
        }
      }
    },
    async getMovie() {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${this.id}?api_key=${this.apiKey}&append_to_response=videos`);
      const data = await response.json();
      console.log(data);
      this.movie = data;
      this.overview = data.overview;
      this.findTrailer();
    }
  },
  created() {
    this.getMovie();
  }
}
</script>

<style>
.movie-data {
  background: -webkit-gradient(linear, left top, right top, from(#7e0046), to(#a91f49));
  background: linear-gradient(to right, #7e0046, #a91f49);
  position: relative;
  width: 100%;
  height: 600px;
}
.movie-data__background {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: 100% 25%;
  opacity: 0.3;
  -webkit-transition: opacity 1s ease 0s;
  transition: opacity 1s ease 0s;
}
.movie-data__foreground {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
}
.movie-data__content {
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
}
.movie-data__image-frame {
  max-width: 17rem;
  position: relative;
  bottom: -5rem;
  -webkit-box-shadow: 0 20px 20px 0 rgba(0, 0, 0, 0.3);
  box-shadow: 0 20px 20px 0 rgba(0, 0, 0, 0.3);
}
.movie-data__image {
  -webkit-transition: opacity 1s ease 0s;
  transition: opacity 1s ease 0s;
}

.movie-detail {
  margin-left: 2rem;
  margin-bottom: 3rem;
}
.movie-detail__year {
  font-size: 1rem;
  color: #fff;
  opacity: 0.8;
}
.movie-detail__title {
  font-size: 2rem;
  font-weight: 600;
  color: #fff;
  margin-top: 5px;
  margin-bottom: 10px;
}

.movie-genre__link {
  background: rgba(98, 98, 98, 0.5);
  font-size: 0.875rem;
  padding: 3px 7px;
  margin-right: 5px;
}

.movie-source {
  display: flex;
  flex-direction: row;
}
.movie-source__link {
  background-color: #484848;
  font-size: 1rem;
  line-height: 1;
  padding: 0.5rem 1rem;
  cursor: pointer;
}
.movie-source__link_trailer:hover {
  background-color: #555555;
}
.movie-source__link_tmdb {
  background-color: #00d373;
  color: #484848;
}
.movie-source__link_tmdb:hover {
  background-color: #00ed81;
}

.icon-trailer {
  display: inline-block;
  background-image: url("../assets/img/icons/trailer.png");
  width: 7px;
  height: 8px;
  margin-right: 6px;
  margin-bottom: 1px;
}

.movie-overview {
  min-height: 8rem;
  margin-left: 310px;
}
.movie-overview__title {
  color: #a91f49;
  text-transform: uppercase;
  font-size: 1.25rem;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
}
.movie-overview__text {
  font-size: 1rem;
  line-height: 1.5;
  color: #989898;
}

@media (max-width: 768px) {
  .movie-data__content {
    flex-direction: column;
    justify-content: flex-end;
    align-items: stretch;
  }
  .movie-data__image-frame {
    max-width: 9rem;
    bottom: 2rem;
  }

  .movie-detail {
    margin-left: 0;
  }
  .movie-detail__title {
    font-size: 1.5rem;
  }

  .movie-source {
    margin: 0 -15px;
  }
  .movie-source__link {
    flex-grow: 1;
  }

  .movie-overview {
    margin-left: 0;
  }
}

@media (max-width: 480px) {
  .movie-source {
    flex-direction: column;
  }
}
</style>