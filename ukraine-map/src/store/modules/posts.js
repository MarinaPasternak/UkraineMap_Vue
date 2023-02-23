export default {
    state: {
        posts: [],
        loading: false,
      },
      mutations: {
        setPosts(state, posts) {
          state.posts = posts;
        },
        setLoading(state, loading) {
          state.loading = loading;
        },
      },
      actions: {
        async fetchPosts({ commit }) {
            commit('setLoading', true);
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts')
                const posts = await response.json()
                commit('setPosts', posts) 
            } catch (error) {
                console.log(error)
            }
          commit('setLoading', false)
        }
      }
  };