<template>
  <div id="app">
    <div>
      <top-header />
      <div>
        <router-link to="/posts">POSTS</router-link>
        <router-link to="/ukraine-map">MAP</router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>
