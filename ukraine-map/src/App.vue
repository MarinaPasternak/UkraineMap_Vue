<template>
  <div id="app">
    <div>
      <b-navbar toggleable="lg" type="light" variant="light">
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" align="center" is-nav>
          <b-navbar-nav>
            <router-link to="/posts" class="nav-link">Posts</router-link>
            <router-link to="/ukraine-map" class="nav-link">Map</router-link>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="css" scoped>
.nav-link {
  padding: 1rem;
  color: rgb(85, 85, 85);
  font-weight: 500;
  font-size: 18pt;
}

.navbar {
  padding: 0.5rem;
  background-color: rgb(210, 210, 210);
}

.navbar .router-link-active {
  color: var(--bs-pagination-active-bg);
}
</style>
