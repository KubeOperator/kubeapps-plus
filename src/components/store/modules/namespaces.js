export default {
    state:{
        items:[],
        kind:'',
        apiVersion:'',
        metadata:{},
        activeSpace:''
    },
    getter:{
        getSpacesInfo: state => {
            return JSON.parse(state.namespace).items
        },
    },
    mutations:{
        initNamespace(state,n){
            state.items = n.items //这里应该要做数据拆分
            state.kind = n.kind
            state.apiVersion = n.apiVersion
            state.metadata = n.metadata
            state.activeSpace = n.items[0].metadata.name
        },
        updateActiveSapce(state,n){
            state.activeSpace = n
        },
        signOut(state){
            state.items=[]
            state.kind=''
            state.apiVersion=''
            state.metadata={}
            state.activeSpace=''
        }
    }
}