简介：

    这是一个一react技术栈为基础的单页应用
    
    技术组成: es6 + webpack + react + react-redux + react-router + node.js v6.4.0
    
    这是一个完整的应用级项目，能够适用于很多的业务场景
    
    这里边包含了完整的组件化管理，数据流管理，接口请求业务逻辑处理
    
    使用脚本创建模块，能够进行快速的开发和迭代
    
    这是一个运用于前端监控系统的项目，我在博客上对其作用做了介绍。

   [点击前往线上Demo](https://www.webfunny.cn/)

   [点击前往博客讲解](https://www.cnblogs.com/warm-stranger/p/10209990.html)    

   [如果实在嫌部署麻烦，Demo系统可以提供7天的监控量，我会长期维护，点击跳转](https://www.webfunny.cn/webfunny/createProject)

如何运行:
    
    为保证页面功能正常， 你需要先部署 Node后台服务：https://github.com/a597873885/webfunny_servers 
    
    Node版本： v10.6.0

    安装依赖包： npm install

    本地运行：   npm run start

    运行完成后访问： http://localhost:9010/webFunny/home , 正常情况下会自动打开浏览器的。


如何打包：

    打包QA环境： npm run qa

    打包staging环境：npm run staging

    打包生产环境： npm run prod



一、如何增加业务线模块

    node module.js moduleName 
    
    即可快速创建一系列的模块代码
    modules, action, reducer, container, scss, router
    
二、如何部署打包的代码

    需要安装Nginx服务器， 配置如下
    server {
        listen       8010;
        server_name  localhost;
        root /Users/jiangyw/WebstormProjects/webfunny/dist;
        index  /webfunny/index.html;
        location /webfunny/ {
            try_files $uri /webfunny/index.html;
        }
    }
    重启Nginx后
    
    访问 http://localhost:8010/webfunny/home 
    




















    
