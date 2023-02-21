<template>
  <div class="p-4 bg-dark movie">
    <v-container>
      <v-card class="text-left movie__container">
        <!-- <router-link class="movie__back" @click="$router.go(-1)"
          ><span>&larr;</span>back</router-link
        > -->
        <div class="movie__body">
          <div class="movie__poster">
            <v-img
              class="mt-6 ml-6"
              v-if="movie.poster_path !== null"
              thumbnail
              :src="imgPath + movie.poster_path"
              width="300"
            ></v-img>
            <v-img
              class="movie__no-img"
              v-else
              thumbnail
              :src="noImgSrc"
            ></v-img>
          </div>
          <div class="movie__descr">
            <div class="movie__header">
              <h1 class="movie__title">
                {{ movie.title }}
                <v-badge :content="rating" color="green"></v-badge>
              </h1>

              <h4 class="movie__date">
                {{ getFilteredDate(movie.release_date) }}
              </h4>
              <div class="movie__tagline" v-show="movie.tagline">
                <span>&#171;{{ movie.tagline }} &#187;</span>
              </div>
            </div>
            <hr class="my-4" />

            <h4 class="font-weight-bold">Genres</h4>
            <ul class="pl-5">
              <li v-for="(genre, inx) in movie.genres" :key="inx">
                {{ genre.name }}
              </li>
            </ul>
            <h4 class="font-weight-bold">Overview</h4>
            <p class="text-md-left">{{ movie.overview }}</p>
          </div>
        </div>
        <h4 class="font-weight-bold">Recommendation</h4>
        <v-row style="width: 95%; margin: 0 auto">
          <v-col>
            <movie-recommendation />
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import config from "../Config.js";
import MovieRecommendation from "@/components/movie/MovieRecommendation.vue";
import moment from "moment";

export default {
  components: {
    MovieRecommendation,
  },
  data() {
    return {
      noImgSrc: config.NO_IMG_SRC,
      imgPath: config.DET_IMG_URL,
    };
  },
  created() {
    this.startComponent();
  },
  computed: {
    movie() {
      return this.$store.getters.MOVIE;
    },
    rating() {
      return parseFloat(this.movie.vote_average).toFixed(1);
    },
  },
  watch: {
    $route() {
      this.startComponent();
    },
  },
  methods: {
    getFilteredDate(date) {
      return moment(date).format("MMMM, YYYY");
    },
    startComponent() {
      this.$store.dispatch("GET_MOVIE_BY_ID", this.$route.params.id);
      this.$store.dispatch("GET_RECOMMENDATIONS_BY_ID", this.$route.params.id);
    },
  },
};
</script>

<style lang="scss">
.movie {
  &__container {
    position: relative;
  }

  &__title {
    font-family: "Roboto", sans-serif;
    font-weight: 300;
    font-size: 70px;
    @media screen and (max-width: 1200px) {
      font-size: 50px;
    }
    @media screen and (max-width: 780px) {
      font-size: 40px;
    }
  }

  &__body {
    display: flex;
    flex-direction: row;
    margin: 15px;
    @media screen and (max-width: 800px) {
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }

  &__rating {
    background-color: var(--green) !important;
    vertical-align: middle !important;
    margin-left: 10px;
    font-size: 30px !important;
  }

  &__descr {
    margin-left: 30px;
    padding: 0px 30px;
    flex-shrink: 10;
    @media screen and (max-width: 800px) {
      margin-left: 0;
    }
  }

  &__tagline {
    font-family: "Raleway", sans-serif;
    font-style: italic;
    font-weight: 300;
    font-size: 22px;
    color: gray;
    display: inline-block;
    margin-top: 10px;
    padding-left: 5px;
    @media screen and (max-width: 800px) {
      padding: 0;
      margin-top: 10px;
      display: flex;
      justify-content: center;
    }
  }

  &__header {
    @media screen and (max-width: 800px) {
      text-align: center;
      margin-top: 20px;
    }
  }

  &__date {
    font-size: 20px;
    color: var(--dark);
    padding-left: 5px;
    @media screen and (max-width: 1200px) {
      font-size: 18px;
    }
    @media screen and (max-width: 780px) {
      font-size: 14px;
    }
  }

  &__no-img {
    width: 310px;
  }

  &__back {
    position: absolute;
    top: 25px;
    @media screen and (max-width: 577px) {
      top: 5px;
    }
    margin-bottom: 5px;
    color: var(--blue);
    text-transform: uppercase;
    span {
      padding-right: 5px;
    }
    font-size: 14px;
  }

  &__back:hover {
    text-decoration: none;
    color: var(--green);
  }
}
</style>
