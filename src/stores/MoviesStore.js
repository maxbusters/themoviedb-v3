import { defineStore } from "pinia";
import api from "../api";

export const useMoviesStore = defineStore("MoviesStore", {
  state: () => {
    return {
      filter: {
        year: new Date().getFullYear(), //year
        genres: [], //with_genres
        rating: 10, //vote_averange.lte
      },
      query: "",
      movies: [],
      popular: [],
      topRated: [],
      movie: {},
      genres: [],
      recommendation: [],
      pages: 0,
      count: 0,
      load: true,
    };
  },
  getters: {
    MOVIES: (state) => {
      return state.movies;
    },
    MOVIE: (state) => {
      return state.movie;
    },
    PAGES: (state) => {
      return state.pages;
    },
    COUNT: (state) => {
      return state.count;
    },
    LOADING: (state) => {
      return state.load;
    },
    GENRES: (state) => {
      return state.genres;
    },
    RECOMMENDATIONS: (state) => {
      return state.recommendation;
    },
    FILTER: (state) => {
      return state.filter;
    },
  },
  actions: {
    SET_LOAD(isLoad) {
      this.load = isLoad;
    },
    SET_MOVIE(movie) {
      this.movie = movie;
    },
    SET_MOVIES_AND_COUNT(movies, count) {
      this.movies = movies;
      this.count = count;
    },
    SET_GENRES(genres) {
      this.genres = genres;
    },
    SET_RECOMMENDATION(recommendation) {
      this.recommendation = recommendation;
    },
    SET_FILTER(filter) {
      this.filter = filter;
    },
    SET_QUERY(query) {
      this.query = query;
    },
    RESET_FILTER() {
      this.filter = {
        year: new Date().getFullYear(),
        genres: [],
        rating: 10,
        sortBy: "",
      };
    },
    GET_POPULAR_BY_PAGE(page) {
      this.SET_LOAD(true);
      api.getPopularByPage(page).then((resp) => {
        this.SET_MOVIES_AND_COUNT(resp.data.results, resp.data.total_results);
      });
      window.setTimeout(() => {
        this.SET_LOAD(false);
      }, 1000);
    },
    GET_TOP_RATED_BY_PAGE(page) {
      this.SET_LOAD(true);
      api.getTopRatedByPage(page).then((resp) => {
        this.SET_MOVIES_AND_COUNT(resp.data.results, resp.data.total_results);
      });
      window.setTimeout(() => {
        this.SET_LOAD(false);
      }, 1000);
    },
    GET_UPCOMING_BY_PAGE(page) {
      this.SET_LOAD(true);
      api.getUpcomingByPage(page).then((resp) => {
        this.SET_MOVIES_AND_COUNT(resp.data.results, resp.data.total_results);
      });
      window.setTimeout(() => {
        this.SET_LOAD(false);
      }, 1000);
    },
    GET_ALL_GENRES() {
      api.getAllGenres().then((resp) => {
        this.SET_GENRES(resp.data.genres);
      });
    },
    GET_MOVIE_BY_ID(id) {
      this.SET_LOAD(true);
      api.getMovieById(id).then((resp) => {
        this.SET_MOVIE(resp.data);
      });
      window.setTimeout(() => {
        this.SET_LOAD(false);
      }, 1000);
    },
    GET_RECOMMENDATIONS_BY_ID(id) {
      api.getRecommendationsById(id).then((resp) => {
        this.SET_RECOMMENDATION(resp.data.results);
      });
    },
    GET_FILTERED_MOVIES_BY_PAGE(page) {
      this.SET_LOAD(true);
      api.getFilteredMoviesByPage(page, this.filter).then((resp) => {
        this.SET_MOVIES_AND_COUNT(resp.data.results, resp.data.total_results);
      });
      window.setTimeout(() => {
        this.SET_LOAD(false);
      }, 1000);
    },
    GET_SEARCH_RESULTS_BY_PAGE(page) {
      this.SET_LOAD(true);
      if (this.query) {
        api.getSearchResultsByPage(page, this.query).then((resp) => {
          console.log(resp);
          this.SET_MOVIES_AND_COUNT(resp.data.results, resp.data.total_results);
        });
      } else {
        api.getPopularByPage(page).then((resp) => {
          this.SET_MOVIES_AND_COUNT(resp.data.results, resp.data.total_results);
        });
      }

      window.setTimeout(() => {
        this.SET_LOAD(false);
      }, 1000);
    },
  },
});
