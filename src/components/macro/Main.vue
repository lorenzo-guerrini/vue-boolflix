<template>
  <div>
    <div>
      <input type="text" name="" id="searchbar" />
      <button>Search</button>
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
      apiURL:
        "https://api.themoviedb.org/3/search/movie",
    };
  },
  methods: {
    getMovies() {
      axios
        .get(this.apiURL, {
          params: {
            api_key: "f77766b6883c25e33f59b75b045376d0",
            query: "prova"
          },
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {
        });
    },
  },
};
</script>

<style></style>
