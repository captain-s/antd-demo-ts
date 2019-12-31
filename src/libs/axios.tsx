import axios from 'axios'
import qs from 'qs'
import store from '../store'
// 当前环境接口请求url
// const ajaxUrl = process.env.NODE_ENV === 'production' ? window.CONFIG.API_URL : ''

const ajaxUrl = '';
/**
 * ajaxUrl : api的base_url
 * timeout : 请求超时时间 5s
 * withCredentials: 跨域请求时是否带cookie
 **/

// 添加Header 参数
// interface setHead {
//     [key: string]: any;
// }
const addHeaderLog = (params:any) => {
    let head = {
        'X-TOKEN' : store.getState() ? store.getState().setToken : ''
    }
    // head['TOKEN'] = store.getState() ? store.getState() : ''
    console.log(store.getState())  //为什么存上之后 getState() 返回的是 key-value 状态
    Object.assign(params.headers,head)
};

class HttpRequest {
    baseURL:string;
    constructor(baseURL:string){
        this.baseURL = baseURL
    }
    getInsideConfig(){
        const config = {
            baseURL : this.baseURL,
            timeout: 1000,
            withCredentials: true, // 默认的
        }
        return config
    }
    interceptors(instance:any,config:any){
        // 添加请求拦截器
        instance.interceptors.request.use(function (config:any) {
            // 在发送请求之前做些什么
            addHeaderLog(config)
            return config;
        }, function (error:any) {
            // 对请求错误做些什么
            return Promise.reject(error);
        });

        // 添加响应拦截器
        instance.interceptors.response.use(function (response:any) {
            // 对响应数据做点什么
            //console.log(store.getState())
            return response;
        }, function (error:any) {
            // 对响应错误做点什么
            return Promise.reject(error);
        });
    }
    request(options:any) {
        const instance = axios.create()
        options = Object.assign(this.getInsideConfig(),options)
        this.interceptors(instance,options.url)
        return instance(options)
    }
}

const Ajax = new HttpRequest(ajaxUrl)

export const ajax = {
    get:function(url:string,params?:any){
        //序列化数据
        params= qs.stringify(params);
        return Ajax.request({
            method: 'get',
            url: url,
            params:params
        })
    },
    post:function(url:string,data?:any) {
        //序列化数据
        data = qs.stringify(data);
        return Ajax.request({
            method: 'post',
            url: url,
            data: data
        })
    }
}