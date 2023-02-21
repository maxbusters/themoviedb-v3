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
          solo
          v-model="searchQuery"
          placeholder="Search..."
          single-line
          variant="outlined"
          color="green"
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
// import FilterSidebar from "@/components/general/FilterSidebar.vue";
import config from "@/Config";
import { useStore } from "vuex";
import { computed, watch, ref } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";

export default {
  // components: {
  //   // FilterSidebar,
  // },
  beforeMount() {
    this.resetSearch();
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const logo = ref(config.LOGO);
    let drawer = ref(false);
    let searchQuery = ref("");
    let validate = ref(false);

    const searchStart = () => {
      store.commit("SET_DATA", {
        name: "query",
        value: searchQuery.value,
      });
      store.dispatch("GET_SEARCH_RESULTS_BY_PAGE", 1);
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
      store.commit("SET_DATA", {
        name: "query",
        value: searchQuery.value,
      });
    };

    watch(searchQuery, () => {
      let reg = new RegExp("^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*$");
      if (searchQuery.value.match(reg) != null) {
        validate.value = true;
      } else {
        validate.value = false;
      }
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
