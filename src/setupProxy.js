const proxy = require('http-proxy-middleware')

module.exports = function(app) {
    app.use(
        proxy(['/api/verify/code','/user/login','/app/list'],{
            target: 'http://dev.consoleapi.starfish.gm825.net',
            secure: false,
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''
            },
            // router: {
                
            // }
        }
        )
    );
    app.use(
        proxy('/api/**/news/latest',{
            target: 'https://news-at.zhihu.com',
            secure: false,
            changeOrigin: true,
        }
        )
    );
    // app.use(
    //     '/api/**/news/latest',
    //     proxy({ target: 'https://news-at.zhihu.com', changeOrigin: true })
    // );
}