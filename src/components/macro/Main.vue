<template>
  <div>
    <div>
      <input type="text" v-model="inputSearch" id="searchbar" />
      <button @click="search">Search</button>
    </div>

    <div class="container">
      <div class="film">
        <div class="title"></div>
        <div class="og-title"></div>
        <div class="lang"></div>
        <div class="rating"></div>
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
          .then(function (response) {
            console.log(response.data.results);
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
