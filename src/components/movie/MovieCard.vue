<template>
  <v-card
    class="card"
    @click="showDetails(movie.id)"
    :style="colored ? 'background-color: #e1e1e1' : ''"
  >
    <div class="card__img-cont">
      <v-badge location="bottom right" color="green" style="min-height: 0px">
        <template #badge>
          <span style="font-size: 14px">{{ ratingFixed }}</span>
        </template>
        <v-img
          v-if="movie.poster_path !== null"
          class="card__img"
          :src="imgPath + movie.poster_path"
        ></v-img>
        <v-img
          v-else
          class="card__img card__img--no-image"
          :src="noImgPath"
        ></v-img>
      </v-badge>
    </div>

    <v-card-text class="card__body">
      <v-card-title>
        <h4 class="card__title">{{ movie.title }}</h4>
      </v-card-title>
      <v-card-subtitle>{{
        getFilteredDate(movie.release_date)
      }}</v-card-subtitle>
    </v-card-text>
  </v-card>
</template>

<script>
import config from "../../Config.js";
import moment from "moment";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
export default {
  setup(props) {
    const router = useRouter();
    let imgPath = ref(config.IMG_URL);
    let noImgPath = ref(config.NO_IMG_SRC);

    const showDetails = function (id) {
      router.push(`/movies/${id}`);
    };

    const getFilteredDate = function (date) {
      return moment(date).format("MMMM, YYYY");
    };

    const ratingFixed = computed(() => {
      return props.movie.vote_average.toFixed(1);
    });

    return {
      imgPath,
      noImgPath,
      showDetails,
      getFilteredDate,
      ratingFixed,
    };
  },

  props: {
    movie: {
      type: Object,
      required: true,
    },
    colored: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.card:hover {
  cursor: pointer;
  transition: all 0.5s ease-out;
  transform: scale(1.05);
  img {
    user-select: none;
  }
}

.card:hover .card__title {
  color: var(--green);
}

.card {
  transition: all 0.5s ease-out;
  &__title {
    color: var(--dark);
    white-space: normal;
  }
  &__img-cont {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 20px;
  }

  &__img {
    width: 200px;
    height: 300px;
  }

  &__img--no-image {
    object-fit: contain;
  }

  &__rating {
    .badge {
      background-color: var(--green) !important;
    }
    font-size: 25px;

    font-family: "Roboto" !important;
    position: absolute;
    z-index: 6;
    bottom: -2px;
    right: 0px;
  }
}
</style>
