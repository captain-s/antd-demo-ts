const SAVETOKEN = 'SAVETOKEN';
// 保存图片地址
export const saveToken = (token:string) => {
    return {
        type: SAVETOKEN,
        token,
    }
}