<template>
  <div class="my-5 pb-5">
    <div v-if="this.count > 0">
      <v-row class="d-flex flex-wrap justify-content-center" style="gap: 27px">
        <movie-card
          class="m-3"
          style="width: 250px"
          v-for="(movie, inx) in movies"
          :key="inx"
          :movie="movie"
          :colored="false"
        ></movie-card>
      </v-row>
      <v-pagination
        theme="dark"
        class="mt-10"
        :length="count"
        :total-visible="10"
        v-model="currentPage"
      ></v-pagination>
    </div>
    <div v-else>
      <v-container>
        <h2 class="main__not-found">There are not results</h2>
      </v-container>
    </div>
  </div>
</template>

<script>
import MovieCard from "@/components/movie/MovieCard.vue";
import { useMoviesStore } from "@/stores/MoviesStore";
import { watch, ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
export default {
  components: {
    MovieCard,
  },
  emits: ["update-view"],
  setup(props, { emit }) {
    const route = useRoute();
    const store = useMoviesStore();
    let currentPage = ref(1);

    const updateView = function (page) {
      emit("update-view", page);
    };

    const movies = computed(() => {
      return store.MOVIES;
    });

    const count = computed(() => {
      if (store.COUNT > 4000) {
        return 4000 / 20;
      } else {
        if (parseInt(store.COUNT / 20) === store.COUNT / 20) {
          return store.COUNT / 20;
        } else {
          return parseInt(store.COUNT / 20) + 1;
        }
      }
    });

    watch(currentPage, (next) => {
      const el = document.getElementById("top-position");
      el.scrollIntoView();
      updateView(next);
    });

    watch(route, () => {
      currentPage.value = 1;
      updateView(currentPage.value);
    });

    onMounted(() => {
      currentPage.value = 1;
      updateView(currentPage.value);
    });

    return {
      currentPage,
      updateView,
      count,
      movies,
    };
  },
};
</script>

<style lang="scss">
.main__not-found {
  color: white;
}
</style>
