export function setToken(state = {}, action:any) {
    switch (action.type) {
    case 'SAVETOKEN':
        return action.token
    default:
        return state
    }
}