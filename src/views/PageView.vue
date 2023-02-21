<template>
  <div>
    <div id="top-position"></div>
    <v-card
      class="movies d-flex flex-column px-12"
      style="width: 95%; background-color: lightgreen"
    >
      <v-card-title
        class="text-h2 px-3 mt-5 mb-6"
        style="color: rgb(18, 18, 18); line-height: 4rem !important"
      >
        {{ title }}
      </v-card-title>
      <movies-list @update-view="updateView"></movies-list>
    </v-card>
  </div>
</template>

<script>
import MoviesList from "@/components/movie/MoviesList.vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";

export default {
  components: {
    MoviesList,
  },
  props: {
    title: {
      require: true,
      type: String,
    },
  },
  setup(props) {
    console.log(props);
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const updateView = (page) => {
      let currRoute = route.name;
      let res = router.getRoutes().find((el) => el.name === currRoute);

      if (res.props.default) {
        store.dispatch(res.props.default.method, page);
        console.log("test");
      }
    };

    return {
      store,
      updateView,
    };
  },
};
</script>

<style>
.movies {
  min-height: 875px;
}
</style>
