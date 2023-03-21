<template>
  <div>
    <div id="top-position"></div>
    <v-card
      class="movies d-flex flex-column px-12"
      style="width: 95%; background-color: lightgreen"
    >
      <div class="d-flex flex-row justify-space-between align-center my-6">
        <v-card-title
          class="text-h4 px-3"
          style="color: rgb(18, 18, 18); line-height: 4rem !important"
        >
          {{ title }}
        </v-card-title>
        <v-btn color="primary" @click="dialog = true"> Open Dialog </v-btn>
      </div>

      <movies-list @update-view="updateView"></movies-list>
    </v-card>
    <v-dialog
      v-model="dialog"
      width="100%"
      style="right: 50%; bottom: 70%; height: 70%"
    >
      <filter-sidebar @close-dialog="closeDialog()" />
    </v-dialog>
  </div>
</template>

<script>
import MoviesList from "@/components/movie/MoviesList.vue";
import { useRouter, useRoute } from "vue-router";
import { ref } from "vue";
import FilterSidebar from "@/components/general/FilterSidebar.vue";
import { useMoviesStore } from "@/stores/MoviesStore";

export default {
  components: {
    MoviesList,
    FilterSidebar,
  },
  props: {
    title: {
      require: true,
      type: String,
    },
  },
  setup() {
    const store = useMoviesStore();
    const router = useRouter();
    const route = useRoute();
    const dialog = ref(false);

    const updateView = (page) => {
      let currRoute = route.name;
      let res = router.getRoutes().find((el) => el.name === currRoute);

      if (res.props.default) {
        const method = res.props.default.method;
        store[`${method}`](page);
      }
    };

    const openDialog = () => {
      console.log(dialog.value);
      dialog.value = true;
      console.log(dialog.value);
    };
    const closeDialog = () => {
      dialog.value = false;
    };

    return {
      store,
      dialog,
      updateView,
      openDialog,
      closeDialog,
    };
  },
};
</script>

<style>
.movies {
  min-height: 875px;
}
</style>
