<template>
  <div>
    <div v-if="allPostComments.length > 0">
      <div class="d-flex statistic-container">
        <div class="chart-container">
          <button @click="showModal" class="btn btn-outline-primary">
            See Statistic There
          </button>
          <b-modal
            :id="modalID"
            title="Number of users emeils symbols"
            :modal-class="'my-modal-class'"
          >
            <canvas
              :ref="refChartName"
              style="height: 400px; width: 400px"
            ></canvas>
          </b-modal>
        </div>
        <p class="comments-count">
          <span
            ><svg
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                class="cls-1"
                d="M17.92,448.24a5,5,0,0,1-5.12-5V115A51.26,51.26,0,0,1,64,63.76H448A51.26,51.26,0,0,1,499.2,115v230.4a51.26,51.26,0,0,1-51.2,51.2H71.5L21.32,446.74A4.65,4.65,0,0,1,17.92,448.24Z"
              />
              <path
                class="cls-2"
                d="M448,76.56A38.44,38.44,0,0,1,486.4,115v230.4a38.44,38.44,0,0,1-38.4,38.4H66.2l-7.5,7.5-33.1,33.1V115A38.44,38.44,0,0,1,64,76.56H448M448,51H64A64,64,0,0,0,0,115V443.21A17.78,17.78,0,0,0,17.92,461a17.42,17.42,0,0,0,12.45-5.25L76.8,409.36H448a64,64,0,0,0,64-64V115a64,64,0,0,0-64-64Z"
              /></svg></span
          >{{ allPostComments.length }}
        </p>
      </div>

      <div v-for="comment in allPostComments" :key="comment.id">
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
          >{{ comment.email }}
        </p>
        <p>
          {{ comment.body }}
        </p>
      </div>
    </div>
    <div v-else class="no-posts-message">There are no comments here yet</div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Chart from "chart.js/auto";

export default {
  props: ["postId"],
  computed: {
    allPostComments() {
      return this.$store.state.comments.comments;
    },
    accordionClassName() {
      return `post${this.postId}`;
    },
    modalID() {
      return `modal${this.postId}`;
    },
    refChartName() {
      return `chart${this.postId}`;
    },
  },
  methods: {
    ...mapActions(["fetchCommentsByPostId"]),
    showModal() {
      this.$bvModal.show(this.modalID);
      this.$nextTick(() => {
        this.renderCharts();
      });
    },
    loadChartData() {
      let symbolCountMap = new Map();

      this.allPostComments.forEach((comment) => {
        if (!symbolCountMap.has(comment.email)) {
          symbolCountMap.set(comment.email, comment.email.length);
        }
      });

      const chartData = {
        labels: [...symbolCountMap.keys()],
        datasets: [
          {
            label: "Number of symbols",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
            data: [...symbolCountMap.values()],
          },
        ],
      };

      return chartData;
    },
    renderCharts() {
      const chartData = this.loadChartData();

      const ctx = this.$refs[this.refChartName].getContext("2d");

      this.chart = new Chart(ctx, {
        type: "bar",
        data: chartData,
        options: {
          responsive: false,
          maintainAspectRatio: false,
          yAxes: [
            {
              type: "linear",
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      });
    },
  },
  mounted() {
    this.fetchCommentsByPostId(this.postId);
  },
};
</script>

<style scoped>
.comments-count {
  text-align: right;
  margin: 0;
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

.users-email svg {
  width: 50px;
  height: 50px;
}

.comments-count .cls-1 {
  fill: white;
}
.comments-count .cls-2 {
  fill: #606161;
}

.comments-count svg {
  width: 30px;
  margin-right: 5px;
}
.my-modal-class {
  width: 400px;
  height: 300px;
}

.statistic-container {
  margin: 20px 10px 14px 10px;
  align-items: center;
  justify-content: space-between;
}
</style>
