import {setStore,getStore} from '../libs/utils'
const defaultState = getStore('SAVETOKEN') ? getStore('SAVETOKEN') : ''
export function setToken(state = defaultState, action:any) {
    switch (action.type) {
    case 'SAVETOKEN':
        setStore(action.type,action.token)
        return action.token;
        break;
    default:
        return state
    }
}