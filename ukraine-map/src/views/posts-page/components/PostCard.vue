<template>
  <div class="card">
    <h3 class="card-title">{{ postTitle }}</h3>
    <p class="card-text">
      {{ postBody }}
    </p>
    <div class="accordion" :id="accordionIDName">
      <div class="accordion-item">
        <h2 class="accordion-header" :id="accordionHeadIDName">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            :data-bs-target="accordionBodyIDNameTag"
            aria-expanded="false"
            :aria-controls="accordionBodyIDName"
          >
            Comments
          </button>
        </h2>
        <div
          :id="accordionBodyIDName"
          class="accordion-collapse collapse"
          :aria-labelledby="accordionHeadIDName"
          :data-bs-parent="accordionIDNameTag"
        >
          <div class="accordion-body">
            <comment-message :post-id="postId"></comment-message>
          </div>
        </div>
      </div>
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
  computed: {
    accordionIDName() {
      return `post${this.postId}`;
    },
    accordionIDNameTag() {
      return `#${this.accordionIDName}`;
    },
    accordionBodyIDName() {
      return `postBody${this.postId}`;
    },
    accordionBodyIDNameTag() {
      return `#${this.accordionBodyIDName}`;
    },
    accordionHeadIDName() {
      return `postHead${this.postId}`;
    },
  },
};
</script>

<style scoped>
.card {
  width: 500px;
  height: fit-content;
  margin-bottom: 1.3rem;
  margin-left: 2rem;
  padding: 1.5rem;
}

.accordion-button {
  color: black;
  background-color: white;
}

.accordion-button:not(.collapsed) {
  color: black;
  background-color: white;
  box-shadow: inset 0 calc(-1 * var(--bs-accordion-border-width)) 0
    var(--bs-accordion-border-color);
}
</style>
