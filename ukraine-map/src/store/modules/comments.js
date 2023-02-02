export default {
    actions: {
        async fetchAllComments(ctx) {
            const fetchResult = await fetch("https://jsonplaceholder.typicode.com/comments");
            const comments = await fetchResult.json();

            ctx.commit('updateComments', comments);
        }
    },
    mutations: {
        updateComments(state, comments) {
            state.allComments = comments;
        }
    },
    state: {
        allComments: null
    },
    getters: {
        getAllComments(state) {
            return state.allComments;
        }
    }
}