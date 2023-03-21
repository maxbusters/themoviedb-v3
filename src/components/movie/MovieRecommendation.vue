<template>
  <div class="recommendation">
    <div v-if="recommendations.length">
      <div
        class="d-flex flex-row flex-nowrap recommendation__cards cards"
        @mousedown="onCardsMousedown"
        @mouseleave="onCardsMouseleave"
        @mouseup="onCardsMouseup"
        @mousemove="onCardsMousemove"
      >
        <movie-card
          v-for="(movie, inx) in recommendations"
          :key="inx"
          :movie="movie"
          :colored="true"
        ></movie-card>
      </div>
    </div>
    <div v-else>
      <h4 class="text-center mt-4 mb-4">recommendations are not available</h4>
    </div>
  </div>
</template>

<script>
import config from "@/Config";
import MovieCard from "./MovieCard.vue";
import { computed, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useMoviesStore } from "@/stores/MoviesStore";

export default {
  components: {
    MovieCard,
  },
  created() {
    this.startComponent();
  },
  setup() {
    const store = useMoviesStore();
    const router = useRouter();
    const route = useRoute();
    ///////////////////////////////
    const imgPath = ref(config.IMG_URL);
    const noImgPath = ref(config.NO_IMG_SRC);
    const isDown = ref(false);
    const startX = ref(0);
    const scrollLeft = ref(0);

    const imagePath = (name) => {
      if (name === null) {
        return "";
      }
      return config.IMG_URL + name;
    };
    const setNoImage = (path) => {
      if (path === null) {
        return "No image avaliable";
      }
    };
    const openMovie = (id) => {
      router.push(`/movies/${id}`, () => {});
    };
    const startComponent = () => {
      store["GET_RECOMMENDATIONS_BY_ID"](route.params.id);
    };
    const onCardsMousedown = (e) => {
      isDown.value = true;
      slider.value.classList.add("active");
      startX.value = e.pageX - slider.value.offsetLeft;
      scrollLeft.value = slider.value.scrollLeft;
    };
    const onCardsMouseleave = () => {
      isDown.value = false;
      slider.value.classList.remove("active");
    };
    const onCardsMouseup = () => {
      isDown.value = false;
      slider.value.classList.remove("active");
    };
    const onCardsMousemove = (e) => {
      if (!isDown.value) return;
      e.preventDefault();
      const x = e.pageX - slider.value.offsetLeft;
      const walk = (x - startX.value) * 2; //scroll-fast
      slider.value.scrollLeft = scrollLeft.value - walk;
    };

    const recommendations = computed(() => {
      return store.RECOMMENDATIONS;
    });
    const slider = computed(() => {
      return document.querySelector(".recommendation__cards");
    });

    return {
      imgPath,
      noImgPath,
      isDown,
      startX,
      scrollLeft,
      imagePath,
      setNoImage,
      openMovie,
      startComponent,
      onCardsMousedown,
      onCardsMouseleave,
      onCardsMouseup,
      onCardsMousemove,
      recommendations,
      slider,
    };
  },
};
</script>

<style lang="scss">
.cards {
  position: relative;
  width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  transition: all 0.2s;
  transform: scale(1);
  will-change: transform;
  user-select: none;
  cursor: pointer;
}

.cards.active {
  cursor: grabbing;
  cursor: -webkit-grabbing;
  transform: scale(1.02);
}

.card {
  min-width: 250px !important;
  min-height: 200px;
}
</style>
