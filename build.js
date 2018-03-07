/**
 * Create by Suqiuhui on 2017/08/09
 * r.js的打包配置文件
 * 进入lib目录下，运行指令 node r.js -o ./../build.js
 * 或者在项目根目录下，运行指令 node ./lib/r.js -o build.js
 * （只有r.js和build.js的相对路径是对应正确的均可实现）
 * 即可完成项目打包
 */
({
    baseUrl: './', 　　 //相对于appDir，代表要查找js文件的起始文件夹，下文所有文件路径的定义都是基于这个baseUrl的

    /*appDir: './', 　　 //项目根目录
    dir: './outDir',　　 //输出目录，全部文件打包后要放入的文件夹（如果没有会自动新建的）
     // 有了dir，就不能使用out配置项了，你在编译时它有非常明确的提示
    modules: [
        //要优化的模块 —— 里面的配置项即各页面的 相对baseUrl路径的 省略后缀“.js”的 入口文件(入口文件 ---- 即加载页面时引入require.js的script标签上data-main属性所指定的文件)
        //该属性必不可少，因为一个程序至少需要有一个入口
        { name:'index'}
    ],*/

    out: 'index-build.js',　　//输出文件名
    name:'index',   //入口文件名
    fileExclusionRegExp: /^(r|build)\.js|.*\.scss$/,　　 //正则匹配过滤文件，匹配到的文件将不会被输出到输出目录去，这里过滤掉的是 r.js、build.js、*.scss三类文件
    optimizeCss: 'standard',
    removeCombined: true, //如果为true，优化器将从输出目录中删除已合并的文件
    paths: {
        "jquery": "./lib/jquery-3.2.1.min",
        "text": "./lib/text",
        "ajax":'./lib/ajax',
        "tools": "./common/tools",
        "linkList": "./common/linkList",
        "app": "./modules/app/app",
        "home": "./modules/home/home",
        "postMD": "./modules/postMD/postMD",
        "getEmoji": "./modules/getEmoji/getEmoji",
        "error": "./modules/error/error",
        "faceMatching":'./modules/faceMatching/faceMatching',
        "miniSPA": "./lib/miniSPA"
    },
    shim:{
    }
})