<template>
  <div id="app" class="position-relative">
    <v-layout>
      <MainNav />
      <v-overlay :opacity="1" :model-value="loading" @click.prevent="">
        <v-progress-circular
          indeterminate
          size="64"
          color="white"
        ></v-progress-circular>
      </v-overlay>
      <v-main
        style="
          height: 1000px;
          width: 100vh;
          overflow-y: scroll;
          background-color: rgb(18, 18, 18);
        "
        class="ml-10 py-10"
      >
        <router-view v-show="!loading" />
      </v-main>
    </v-layout>
  </div>
</template>
<script>
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
import MainNav from "./components/general/MainNav.vue";
export default {
  name: "App",
  components: {
    MainNav,
  },
  setup() {
    const store = useStore();

    const loading = computed(() => {
      return store.getters.LOADING;
    });

    return {
      loading,
    };
  },
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Raleway:ital,wght@1,100&display=swap");
html {
  overflow: hidden !important;
}
.main-title {
  text-align: center;
}

.v-overlay__content {
  top: 50%;
  left: 50%;
}
</style>
