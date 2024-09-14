<template>
  <router-view></router-view>
  <FirstView v-if="this.$route.path === '/first' || this.$route.path === '/'" />
</template>

<script>
  import FirstView from './views/FirstPageView.vue';

  export default{
    components: {FirstView},

  }
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
