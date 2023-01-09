<template>
  <div>
    <h1>POSTS</h1>
    <div class="d-flex posts-list">
      <post-card
        v-for="item in getAllPosts"
        :key="item.id"
        :post-id="item.id"
        :post-body="item.body"
        :post-title="item.title"
        :all-comments="allComments"
      ></post-card>
    </div>
  </div>
</template>

<script>
import PostCard from "./components/PostCard.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      allComments: [],
    };
  },
  components: {
    PostCard,
  },
  computed: mapGetters(["getAllPosts"]),
  methods: mapActions(["fetchAllPosts"]),
  async mounted() {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    );
    this.allComments = await response.json();

    if (this.allComments) {
      this.fetchAllPosts();
    }
  },
};
</script>

<style scoped>
.posts-list {
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
