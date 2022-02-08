<template>
  <div>
    <input
      type="text"
      v-model="inputSearch"
      id="search-bar"
      @keyup="$emit('searchTitle', inputSearch)"
      placeholder="Search title"
    />
    <button @click="$emit('searchTitle', inputSearch)">Search</button>
  </div>
</template>

<script>
export default {
  name: "Search",
  props: {},
  data() {
    return {
      inputSearch: "",
    };
  },
};
</script>

<style lang="scss" scoped></style>
