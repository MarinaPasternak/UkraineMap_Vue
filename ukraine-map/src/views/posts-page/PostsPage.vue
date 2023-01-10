<template>
  <div>
    <h1>POSTS</h1>
    <input
      type="text"
      placeholder="Start typing..."
      v-model="searchedPostTitle"
    />
    <template v-if="filteredPosts">
      <div class="d-flex posts-list">
        <post-card
          v-for="item in filteredPosts"
          :key="item.id"
          :post-id="item.id"
          :post-body="item.body"
          :post-title="item.title"
          :all-comments="allComments"
        ></post-card>
      </div>
    </template>
    <template v-else>
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
    </template>
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
      filteredPosts: null,
      allComments: null,
    };
  },
  components: {
    PostCard,
  },
  computed: mapGetters(["getAllPosts"]),
  methods: {
    ...mapActions(["fetchAllPosts"]),
  },
  watch: {
    searchedPostTitle() {
      if (!this.awaitingSearch) {
        setTimeout(() => {
          if (this.searchedPostTitle.length > 0) {
            this.filteredPosts = this.getAllPosts.filter((post) =>
              post.title.includes(this.searchedPostTitle)
            );
          } else {
            this.filteredPosts = this.getAllPosts;
          }

          this.awaitingSearch = false;
        }, 1500);
      }
      this.awaitingSearch = true;
    },
  },
  async created() {
    // const response = await fetch(
    //   "https://jsonplaceholder.typicode.com/comments"
    // );
    // this.allComments = await response.json();
    this.allComments = [];
    this.fetchAllPosts();
  },
};
</script>

<style scoped>
.posts-list {
  flex-wrap: wrap;
  justify-content: space-around;
}

h1 {
  margin: 1.2rem;
}

input {
  display: flex;
  margin: 1.2rem;
  margin-left: auto;
}
</style>
