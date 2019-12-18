import apiSetting from "../../utils/apiSetting.js";
import http from "../../utils/httpAxios.js";
// import { Stats } from "fs";
export default {
    state: {
        items: [],
        kind: '',
        apiVersion: '',
        metadata: {},
        activeSpace: '',
        releases: [],
        api: {},
        loadingState:false,
    },
    getter: {
        getSpacesInfo: state => {
            return JSON.parse(state.namespace).items
        },
        getReleaseDetail: state => {
            return state.releases
        }
    },
    actions: {
        getRelease(context){
            context.commit('updateLoadingState',true)
            http(context.rootState.namespaces.api).then(res => {
                if(res.status == 200 ){
                    context.commit('updateRelease',res.data)
                    context.commit('updateLoadingState',false)
                }
            });
        }
    },
    mutations: {
        initNamespace(state, n) {
            state.items = n.items //这里应该要做数据拆分
            state.kind = n.kind
            state.apiVersion = n.apiVersion
            state.metadata = n.metadata
            state.activeSpace = n.items[0].metadata.name
            var api = {
                url: "",
                method: ""
            };
            api.url =
                apiSetting.kubernetes.getRelease.url +
                n.items[0].metadata.name +
                "/releases?statuses=all";
            api.method = apiSetting.kubernetes.getRelease.method;
            state.api = api
        },
        updateActiveSapce(state, n) {
            state.activeSpace = n
            var api = {
                url: "",
                method: ""
            };
            api.url =
                apiSetting.kubernetes.getRelease.url +
                n +
                "/releases?statuses=all";
            api.method = apiSetting.kubernetes.getRelease.method;
            state.api = api
        },
        signOut(state) {
            state.items = []
            state.kind = ''
            state.apiVersion = ''
            state.metadata = {}
            state.activeSpace = ''
        },
        updateRelease(state,data){
            state.releases = data
        },
        updateLoadingState(state,loadingstate){
            state.loadingState = loadingstate
        }

    }
}