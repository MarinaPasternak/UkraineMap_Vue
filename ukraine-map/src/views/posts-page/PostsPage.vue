<template>
  <div class="post-page-container">
    <h1>POSTS</h1>
    <div class="d-flex filter-container">
      <b-pagination
        :total-rows="totalRows"
        :per-page="perPage"
        v-model="currentPage"
        @input="fetchPosts"
        class="posts-pagination"
      ></b-pagination>
      <input v-model="searchTerm" type="text" placeholder="Search by title" />
    </div>
    <div v-if="loading && filteredPosts" class="spinner">Loading...</div>
    <div v-else class="d-flex posts-list">
      <post-card
        v-for="item in filteredPosts"
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
      @input="fetchPosts"
      class="posts-pagination"
    ></b-pagination>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import PostCard from "./components/PostCard.vue";
export default {
  components: {
    PostCard,
  },
  data() {
    return {
      currentPage: 1,
      perPage: 10,
      totalRows: 0,
      searchTerm: "",
    };
  },
  computed: {
    ...mapState({
      loading: (state) => state.loading,
      allPosts: (state) => state.posts.posts,
    }),
    filteredPosts(state) {
      const filteredPosts = this.allPosts?.filter((post) =>
        post.title.toLowerCase().includes(state.searchTerm.trim().toLowerCase())
      );

      this.countAllRFilterdRecords(filteredPosts);

      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;

      return filteredPosts.slice(startIndex, endIndex);
    },
  },
  methods: {
    ...mapActions(["fetchPosts"]),
    countAllRFilterdRecords(posts) {
      this.totalRows = posts.length;
    },
  },
  mounted() {
    this.fetchPosts();
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

.filter-container {
  margin: 3rem;
  justify-content: space-between;
  align-items: center;
}
</style>
