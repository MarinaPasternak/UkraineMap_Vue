<template>
  <div id="app">
    <div>
      <router-link to="/posts">Posts</router-link>
      <router-link to="/ukraine-map">Map</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="css" scoped></style>
