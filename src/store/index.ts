import {createStore, combineReducers} from 'redux';
import {setToken} from './reducer'
// import {saveToken} from './action'

const store = createStore(
    combineReducers({setToken})
)
// console.log(store.getState())
// store.dispatch(saveToken('ADD_TODO'))
// console.log(store.getState())
export default store;