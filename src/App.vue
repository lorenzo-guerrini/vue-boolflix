<template>
  <div id="app">
    <Header />
    <Main />
  </div>
</template>

<script>
import Main from "@/components/macro/Main.vue";
import Header from "@/components/macro/Header.vue";

export default {
  name: "App",
  components: {
    Main,
    Header,
  },
};
</script>

<style lang="scss">
@import "./assets/style/global.scss";

#app {
  text-align: center;
}
</style>
