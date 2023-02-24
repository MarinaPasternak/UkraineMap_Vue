import axios from 'axios';

export default {
    actions: {
        async fetchCommentsByPostId({ commit }, postId) {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/comments`);
            const filteredData = response.data.filter(comment => comment.postId === postId);
            commit('setComments', filteredData);
          }
    },
    mutations: {
        setComments(state, comments) {
            state.comments = comments;
        }
    },
    state: {
        comments: []
    },
}