关于自定义hook -sdk页面 

里面涉及
1、如何设置代理 proxy （多代理状态）；
安装插件、并且在根目录下创建 setupProxy.js

2、如何设置文件快捷寻找入口，在ts状态下需要特别设置 tsconfig.json 
        "extends": "./paths.json"  按需引入

3、react-app-rewired 下  config-overrides.js 统一配置webpack， 不需要 npm run eject

4、当前sdk页面、 重复方法如何请求。