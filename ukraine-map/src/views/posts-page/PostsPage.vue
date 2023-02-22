<template>
  <div class="post-page-container">
    <h1>POSTS</h1>
    <b-pagination
      :total-rows="totalRows"
      :per-page="perPage"
      v-model="currentPage"
      @input="fetchData"
      class="posts-pagination"
    ></b-pagination>
    <div v-if="loading" class="spinner">Loading...</div>
    <div v-else class="d-flex posts-list">
      <post-card
        v-for="item in allPosts"
        :key="item.id"
        :post-id="item.id"
        :post-body="item.body"
        :post-title="item.title"
      ></post-card>
    </div>
    <b-pagination
      :total-rows="totalRows"
      :per-page="perPage"
      v-model="currentPage"
      @input="fetchData"
      class="posts-pagination"
    ></b-pagination>
  </div>
</template>

<script>
import PostCard from "./components/PostCard.vue";
export default {
  components: {
    PostCard,
  },
  computed: {
    totalRows() {
      return this.$store.state.posts.posts.length;
    },
    perPage() {
      return 10;
    },
    allPosts() {
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      return this.$store.state.posts.posts.slice(startIndex, endIndex);
    },
    loading() {
      return this.$store.state.loading;
    },
  },
  data() {
    return {
      currentPage: 1,
    };
  },
  methods: {
    fetchData() {
      this.$store.dispatch("fetchPosts");
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style>
.spinner {
  text-align: center;
  margin-top: 20px;
}

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
.posts-pagination {
  justify-content: center;
}
</style>
