import { createStore, Store } from "redux"

interface IState{

}
const initState:IState={}

interface IAction{
    type:string,
    data?:any,
}

const reducer=(oldState:IState=initState, action:IAction)=>{
    switch(action.type){
        default:
            return oldState
    }
}

const store:Store=createStore(reducer)

function testStore(){
    console.log(`test store`)
    console.log(store.getState())
}
testStore()

export type {IAction}
export {store}