export default {
    state:{
        namespace:{},
        activeSpace:''
    },
    getter:{
        getSpacesInfo: state => {
            return state.namespace.items
        },
    },
    mutations:{
        initNamespace(state,n){
            state.namespace = n //这里应该要做数据拆分
            state.activeSpace = n.items[0].metadata.name
        },
        updateActiveSapce(state,n){
            state.activeSpace = n
        }
    }
}