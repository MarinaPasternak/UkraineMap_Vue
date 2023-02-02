<template>
  <div class="card">
    <h3 class="card-title">{{ postTitle }}</h3>
    <p class="card-text">
      {{ postBody }}
    </p>
    <div>
      <comment-message :post-id="postId"></comment-message>
    </div>
  </div>
</template>

<script>
import CommentMessage from "./CommentMessage";
export default {
  props: ["postBody", "postTitle", "postId", "allComments"],
  components: {
    CommentMessage,
  },
  computed: {},
};
</script>

<style scoped>
.card {
  width: 350px;
  margin-bottom: 1.3rem;
  padding: 1.5rem;
}
</style>
