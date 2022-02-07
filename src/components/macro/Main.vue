<template>
  <div>
    <div>
      <input type="text" v-model="inputSearch" id="searchbar" />
      <button @click="search">Search</button>
    </div>

    <div class="container">
      <div v-for="(element, i) in resultsArray" :key="i" class="film">
        <div class="title">{{ element.title }}</div>
        <div class="og-title">{{ element.original_title }}</div>
        <div class="lang">{{ element.original_language }}</div>
        <div class="rating">{{ element.vote_average }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Main",
  data() {
    return {
      apiURL: "https://api.themoviedb.org/3/search/movie",
      inputSearch: "",
      resultsArray: [],
    };
  },
  methods: {
    getMovies() {
      //Se l'input non è vuoto, esegue l'api GET
      if (this.inputSearch.trim().length > 0) {
        axios
          .get(this.apiURL, {
            params: {
              api_key: "f77766b6883c25e33f59b75b045376d0",
              query: this.inputSearch,
            },
          })
          .then((response) => {
            this.resultsArray = response.data.results;
          })
          .catch(function (error) {
            console.log(error);
          })
          .then(function () {});
      }
    },
    search() {
      this.getMovies();
    },
  },
};
</script>

<style></style>
