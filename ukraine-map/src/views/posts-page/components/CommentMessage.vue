<template>
  <div>
    <div v-if="commentsForPost && commentsForPost.length > 0">
      <p class="comments-count">
        <span>Comments: </span>{{ commentsForPost.length }}
      </p>
      <div v-for="item in commentsForPost" :key="item.id">
        <p>{{ item.email }}</p>
        <p>
          {{ item.body }}
        </p>
      </div>
    </div>
    <div v-else class="no-posts-message">There are no posts here yet</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["postId"],
  computed: {
    ...mapGetters(["getAllComments"]),
    commentsForPost() {
      return this.getAllComments?.filter(
        (comment) => comment.postId === this.postId
      );
    },
  },
  methods: {
    ...mapActions(["fetchAllComments"]),
  },
  mounted() {
    this.fetchAllComments();
  },
};
</script>

<style scoped>
.no-posts-message,
.comments-count span {
  font-weight: 800;
}
</style>
