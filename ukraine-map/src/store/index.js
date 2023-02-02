import Vue from 'vue'
import Vuex from 'vuex'
import allPosts from './modules/posts'
import allComments from './modules/comments'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        allPosts,
        allComments
    }
})