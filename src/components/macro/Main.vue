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
        <div class="lang" v-if="hasFlag(element.original_language)">
          <Flag :code="getFlagCode(element.original_language)" />
        </div>
        <div class="lang no-flag" v-else>
          <span class="no-flag">{{ element.original_language }}</span>
        </div>
        <div class="rating">{{ element.vote_average }}</div>
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
      apiURL: "https://api.themoviedb.org/3/search/movie",
      inputSearch: "",
      resultsArray: [],
      langExceptionsArray: ["EN", "HI", "JA"],
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
      this.getMovies();
    },
  },
};
</script>

<style lang="scss" scoped>
.film {
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
