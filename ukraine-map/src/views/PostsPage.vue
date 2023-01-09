<template>
  <div>
    <h1>POSTS</h1>
    <div class="d-flex posts-list">
      <div class="card" v-for="item in getAllPosts" :key="item.id">
        <h5 class="card-title">{{ item.title }}</h5>
        <p class="card-text">
          {{ item.body }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: mapGetters(["getAllPosts"]),
  methods: mapActions(["fetchAllPosts"]),
  async mounted() {
    this.fetchAllPosts();
  },
};
</script>

<style scoped>
.posts-list {
  flex-wrap: wrap;
}
.card {
  width: 250px;
  margin: 1.3rem;
  padding: 1.5rem;
}
</style>
