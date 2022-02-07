<template>
  <div>
    <div>
      <input type="text" v-model="inputSearch " id="searchbar" @keyup="search"/>
      <button @click="search">Search</button>
    </div>

    <div class="container">
      <div class="movies-contaier">
        <h2>Film</h2>
        <div v-for="movie in movieResultsArray" :key="movie.id" class="film">
          <div class="poster"><img :src="'https://image.tmdb.org/t/p/w185/' + movie.poster_path" :alt="movie.title"></div>
          <div class="title">{{ movie.title }}</div>
          <div class="og-title">{{ movie.original_title }}</div>
          <div class="lang" v-if="hasFlag(movie.original_language)">
            <Flag :code="getFlagCode(movie.original_language)" />
          </div>
          <div class="lang no-flag" v-else>
            <span class="no-flag">{{ movie.original_language }}</span>
          </div>
          <div class="rating">{{ movie.vote_average }}</div>
        </div>
      </div>

      <div class="tv-container">
        <h2>Serie TV</h2>
        <div
          v-for="series in tvSeriesResultsArray"
          :key="series.id"
          class="tv-series"
        >
        <div class="poster"><img :src="'https://image.tmdb.org/t/p/w185/' + series.poster_path" :alt="series.title"></div>
          <div class="title">{{ series.name }}</div>
          <div class="og-title">{{ series.original_name }}</div>
          <div class="lang" v-if="hasFlag(series.original_language)">
            <Flag :code="getFlagCode(series.original_language)" />
          </div>
          <div class="lang no-flag" v-else>
            <span class="no-flag">{{ series.original_language }}</span>
          </div>
          <div class="rating">{{ series.vote_average }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import alpha2 from "../../data/alpha2.json";

export default {
  name: "Main",
  data() {
    return {
      apiKey: "f77766b6883c25e33f59b75b045376d0",
      apiMoviesURL: "https://api.themoviedb.org/3/search/movie",
      apiTVSeriesUrl: "https://api.themoviedb.org/3/search/tv",
      inputSearch: "",
      movieResultsArray: [],
      tvSeriesResultsArray: [],
      langExceptionsArray: ["EN", "HI", "JA"],
    };
  },
  methods: {
    getMovies() {
      axios
        .get(this.apiMoviesURL, {
          params: {
            api_key: this.apiKey,
            query: this.inputSearch,
          },
        })
        .then((response) => {
          this.movieResultsArray = response.data.results;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getTvSeries() {
      axios
        .get(this.apiTVSeriesUrl, {
          params: {
            api_key: this.apiKey,
            query: this.inputSearch,
          },
        })
        .then((response) => {
          this.tvSeriesResultsArray = response.data.results;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //Controlla se una bandiera è presente con la lingua inserita
    hasFlag(language) {
      language = language.toUpperCase().trim();

      //Controlla la lingua dentro l'array eccezioni
      if (this.langExceptionsArray.includes(language)) {
        return true;
      }

      //Controlla la lingua dentro alpha2.json
      let hasFlagBool = false;
      alpha2.forEach((element) => {
        if (element.Code == language) {
          hasFlagBool = true;
        }
      });
      return hasFlagBool;
    },
    //Restituisce il code flag per il plugin flagpack
    getFlagCode(language) {
      let flag = "";
      switch (language.trim()) {
        case "en":
          flag = "GBR";
          break;
        case "hi":
          flag = "IN";
          break;
        case "ja":
          flag = "JP";
          break;
        default:
          flag = language.toUpperCase();
      }
      return flag;
    },
    search() {
      //Se l'input non è vuoto, esegue le funzioni
      if (this.inputSearch.trim().length > 0) {
        this.getMovies();
        this.getTvSeries();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.film,
.tv-series {
  border: 1px solid black;
}

.lang {
  // Se manca la bandiera inserisce la lingua in maiuscolo con bordo
  .no-flag {
    display: inline-block;

    padding: 0px 5px;
    border: 1px solid black;

    text-transform: uppercase;
  }
}
</style>
