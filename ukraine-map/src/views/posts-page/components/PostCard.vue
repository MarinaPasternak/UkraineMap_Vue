<template>
  <div class="card">
    <h3 class="card-title">{{ postTitle }}</h3>
    <p class="card-text">
      {{ postBody }}
    </p>
    <p class="comments-count">
      <span>Comments: </span>{{ countOfCommentsPerPost }}
    </p>
  </div>
</template>

<script>
export default {
  props: ["postBody", "postTitle", "postId", "allComments"],
  computed: {
    countOfCommentsPerPost() {
      const comments = this.allComments;
      const allPostСomments = comments.filter(
        (comment) => comment.postId === this.postId
      );

      return allPostСomments.length;
    },
  },
};
</script>

<style scoped>
.card {
  width: 350px;
  margin-bottom: 1.3rem;
  padding: 1.5rem;
}

.comments-count span {
  font-weight: 800;
}
</style>
