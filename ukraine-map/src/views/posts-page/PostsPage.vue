<template>
  <div class="post-page-container">
    <h1>POSTS</h1>
    <input
      type="text"
      placeholder="Start typing post title..."
      v-model="searchedPostTitle"
    />
    <div v-if="filteredPosts && filteredPosts.length" class="d-flex posts-list">
      <post-card
        v-for="item in filteredPosts"
        :key="item.id"
        :post-id="item.id"
        :post-body="item.body"
        :post-title="item.title"
      ></post-card>
    </div>
    <div v-else-if="filteredPosts.length === 0 && getAllPosts.length > 0">
      Nothig founded
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import PostCard from "./components/PostCard.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      userTypingTimer: null,
      searchedPostTitle: "",
    };
  },
  components: {
    PostCard,
  },
  computed: {
    ...mapGetters(["getAllPosts"]),
    filteredPosts() {
      return this.getAllPosts?.filter((post) => {
        return post.title
          .toLowerCase()
          .includes(this.searchedPostTitle.toLowerCase());
      });
    },
  },
  methods: {
    ...mapActions(["fetchAllPosts"]),
  },
  mounted() {
    this.fetchAllPosts();
  },
};
</script>

<style scoped>
.post-page-container {
  padding: 3rem;
}
.posts-list {
  flex-wrap: wrap;
  justify-content: center;
}

h1 {
  margin: 1.2rem;
}

input {
  display: flex;
  width: 250px;
  margin: 1.2rem;
  margin-left: auto;
}
</style>
