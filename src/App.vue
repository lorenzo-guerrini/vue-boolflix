<template>
  <div id="app">
    <Main />
  </div>
</template>

<script>
import Main from "@/components/macro/Main.vue";

export default {
  name: "App",
  components: {
    Main,
  },
};
</script>

<style lang="scss">
@import "./assets/style/global.scss";

#app {
  text-align: center;
}
</style>
