<template>
  <v-navigation-drawer
    expand-on-hover
    @mouseenter="drawer = true"
    @mouseleave="drawer = false"
    :rail="true"
    :permanent="true"
    theme="dark"
  >
    <v-list>
      <v-list-item
        :prepend-avatar="logo"
        title="The Movie DB"
        @click="goTo('/')"
        style="cursor: pointer"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        color="green"
        prepend-icon="mdi-fire"
        title="Popular"
        to="/popular"
      ></v-list-item>
      <v-list-item
        color="green"
        prepend-icon="mdi-star"
        title="Top Rated"
        to="/toprated"
      >
      </v-list-item>
      <v-list-item
        color="green"
        prepend-icon="mdi-calendar-clock"
        title="Upcoming"
        to="/upcoming"
      ></v-list-item>
      <v-divider></v-divider>
      <v-list-item v-if="drawer">
        <v-text-field
          class="mt-3"
          v-model="searchQuery"
          variant="outlined"
          label="Search by name"
          color="green"
          style="border-radius: 20px"
          hide-details
        ></v-text-field>
        <v-btn
          class="my-2"
          :disabled="validate == false"
          color="green"
          @click="searchStart"
          >Search</v-btn
        >
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import config from "@/Config";
import { computed, watch, ref, onBeforeMount } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { useMoviesStore } from "@/stores/MoviesStore";

export default {
  setup() {
    const store = useMoviesStore();
    const route = useRoute();
    const router = useRouter();
    const logo = ref(config.LOGO);
    let drawer = ref(false);
    let searchQuery = ref("");
    let validate = ref(false);

    const searchStart = () => {
      store.SET_QUERY(searchQuery.value);
      store.GET_SEARCH_RESULTS_BY_PAGE(1);
      router.push("/search", () => {});
    };

    const goTo = function (path) {
      router.push(path);
    };

    const isMain = computed(() => {
      if (route.path === "/") {
        return true;
      } else {
        return false;
      }
    });

    const resetSearch = () => {
      searchQuery.value = "";
      store.SET_QUERY("");
    };

    watch(searchQuery, () => {
      let reg = new RegExp("^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*$");
      if (searchQuery.value.match(reg) != null) {
        validate.value = true;
      } else {
        validate.value = false;
      }
    });

    onBeforeMount(() => {
      resetSearch();
    });

    return {
      logo,
      searchQuery,
      validate,
      drawer,
      searchStart,
      resetSearch,
      goTo,
      isMain,
    };
  },
};
</script>
