export default {
    actions: {
        async fetchAllPosts(ctx) {
            const fetchResult = await fetch("https://jsonplaceholder.typicode.com/posts");
            const posts = await fetchResult.json();

            ctx.commit('updatePosts', posts);
        }
    },
    mutations: {
        updatePosts(state, posts) {
            state.allPosts = posts;
        }
    },
    state: {
        allPosts: null
    },
    getters: {
        getAllPosts(state) {
            return state.allPosts
        }
    }
}