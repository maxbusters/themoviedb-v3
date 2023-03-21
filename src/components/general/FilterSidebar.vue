<template>
  <v-card>
    <v-card-title>Filter</v-card-title>
    <v-card-text>
      <h5>Genres</h5>
      <v-select
        v-model="filter.genres"
        :items="allGenres"
        :item-title="(item) => item.name"
        :item-value="(item) => item"
        chips
        :clearable="true"
        label="Select genre"
        multiple
      ></v-select>
      <h5>Year</h5>
      <v-slider
        v-model:model-value="filter.year"
        step="1"
        :min="1900"
        :max="getMaxYear()"
        thumb-label="always"
      ></v-slider>
      <h5>Rating</h5>
      <v-slider
        v-model="filter.rating"
        :min="0"
        :max="10"
        step="0.1"
        thumb-label="always"
      >
      </v-slider>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="closeDialog()">Close Dialog</v-btn>
      <v-btn @click="startFilter">Filter</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMoviesStore } from "@/stores/MoviesStore";

export default {
  emits: ["close-dialog"],
  setup(props, { emit }) {
    const store = useMoviesStore();
    const route = useRoute();
    const router = useRouter();
    const sort = ref({
      options: [
        { text: "By popularity", value: "popularity.desc" },
        { text: "By rating", value: "vote_average.desc" },
        { text: "By release date", value: "release_date.desc" },
      ],
    });
    const filter = ref({
      year: "",
      genres: [],
      rating: 0,
      sortBy: "",
    });
    const isValid = ref(false);

    const startComponent = () => {
      store.GET_ALL_GENRES();
      filter.value = store.FILTER;
      if (route.name !== "FilterResult") {
        store.RESET_FILTER();
        filter.value = store.FILTER;
      }
    };
    const startFilter = () => {
      store.SET_FILTER(filter.value);
      store.GET_FILTERED_MOVIES_BY_PAGE(1);
      router.push("/filter", () => {});
    };
    const getMaxYear = () => {
      return new Date().getFullYear() + 5;
    };
    const closeDialog = () => {
      emit("close-dialog");
    };

    const allGenres = computed(() => {
      return store.GENRES;
    });

    watch(route, (to) => {
      console.log(to);
      if (to.path !== "/filter") {
        store.RESET_FILTER();
        filter.value = store.FILTER;
      }
    });

    onMounted(() => {
      startComponent();
    });

    return {
      sort,
      filter,
      isValid,
      closeDialog,
      startComponent,
      startFilter,
      getMaxYear,
      allGenres,
    };
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss">
.filter {
  input[type="range"]::-webkit-slider-thumb {
    background-color: var(--green);
  }

  .vdp-datepicker {
    &__calendar {
      width: 270px !important;
    }

    &__calendar .cell:not(.blank):not(.disabled).day:hover,
    &__calendar .cell:not(.blank):not(.disabled).month:hover,
    &__calendar .cell:not(.blank):not(.disabled).year:hover {
      border: 1px solid var(--green) !important;
    }
    &__calendar .cell.selected {
      background: var(--green) !important;
      color: white;
    }
    &__calendar .cell.selected:hover {
      background: var(--green) !important;
    }
    &__calendar .cell.selected.highlighted {
      background: var(--green) !important;
    }
  }

  .multiselect {
    &__tags-wrap {
      display: flex;
      flex-wrap: wrap;
    }
    &__option--highlight {
      background: var(--green);
    }
    &__option--highlight::after {
      background: var(--green);
    }
  }
  .custom {
    &__tag {
      background-color: var(--green);
      color: white;
      border-radius: 3px;
      padding: 1px 5px;
      margin-left: 5px;
      margin-bottom: 5px;
    }

    &__remove {
      color: black;
      padding-left: 5px;
    }

    &__remove:hover {
      cursor: pointer;
    }
  }
}
</style>
