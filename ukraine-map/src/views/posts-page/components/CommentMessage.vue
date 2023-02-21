<template>
  <div>
    <div v-if="commentsForPost && commentsForPost.length > 0">
      <p class="comments-count">
        <span>All Comments </span>{{ commentsForPost.length }}
      </p>
      <div v-for="item in commentsForPost" :key="item.id">
        <p class="users-email">
          <span
            ><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <title />
              <g data-name="Layer 7" id="Layer_7">
                <path
                  class="cls-1"
                  d="M19.75,15.67a6,6,0,1,0-7.51,0A11,11,0,0,0,5,26v1H27V26A11,11,0,0,0,19.75,15.67ZM12,11a4,4,0,1,1,4,4A4,4,0,0,1,12,11ZM7.06,25a9,9,0,0,1,17.89,0Z"
                />
              </g></svg></span
          >{{ item.email }}
        </p>
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
    accordionClassName() {
      return `post${this.postId}`;
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
.comments-count {
  text-align: right;
}
.no-posts-message,
.comments-count,
.users-email {
  color: rgb(85, 85, 85);
  font-weight: 700;
}
.cls-1 {
  fill: #606161;
}
.users-email svg {
  width: 50px;
  height: 50px;
}
</style>
