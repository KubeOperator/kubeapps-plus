import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

import namespaces from './modules/namespaces.js';//引入某个store对象

export default new vuex.Store({
    modules: {
        namespaces,
    }
})