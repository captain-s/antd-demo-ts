const SAVETOKEN = 'SAVETOKEN';

export const saveToken = (token:string) => {
    return {
        type: SAVETOKEN,
        token: token
    }
}