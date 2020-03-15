const path = require('path'), //解决路径问题
      HtmlWebpackPlugin = require('html-webpack-plugin'), //HTML插件
      Extract = require('extract-text-webpack-plugin'), //抽离css插件
      MiniCssExtractPlugin = require('mini-css-extract-plugin'); //抽离css插件（未使用）


const pligin = new Extract({
    filename: '[name].css',
    ignoreOrder: true
})

module.exports = {
    mode: 'development', //开发模式和生产模式 development or production
    entry: { //进入页面时，需要统一加载的js文件
        index: path.resolve(__dirname,'./src/js/index.js'),
        common: path.resolve(__dirname,'./src/js/common.js')
    },
    output: { //打包后，输出的文件位置及名称
        // path: path.resolve(__dirname+'/dist'),
        filename: 'js/[name].js'
    },
    module: { //模块加载 css,img文件加载需要遵循的规则
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                // exclude: path.resolve(__dirname,'node-modules')
            },
            {
                test: /\.css$/,
                use: Extract.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.scss$/,
                // use: [ 使用这种方式会打包到行内样式style标签内
                //     'style-loader',
                //     'css-loader',
                //     'sass-loader'
                // ]
                use: Extract.extract({ //抽离到外部css中
                    fallback: 'style-loader',
                    use: ['css-loader','sass-loader']
                })
            },
            {
                test: /\.tpl$/,
                use: [
                    'html-loader',
                    'ejs-loader'
                ]
            },
            {
                test:/\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        // loader: 'url-loader',
                        loader: 'file-loader',
                        options: {
                          esModule: false, // 这里设置为false
                          name: '[name].[ext]',
                          limit: 10240,
                          publicPath: '../images', //使用url路径的时候，会结合该路径找相关文件
                          outputPath: 'images/' //输出文件的位置
                        }
                    },
                ]
            },
            {
                test: require.resolve('jquery'), //引入由npm下载的模块时，将该模块暴露在全局环境下
                use: [
                    {
                        loader: 'expose-loader',
                        options: '$' //window.$
                    },
                    {
                        loader: 'expose-loader',
                        options: 'JQ' //window.JQ
                    }
                ]
            },
            {
                test: /\.ttf$/,
                loader: 'file-loader',
                options: { //同css loader
                    name: '[name].[ext]',
                    publicPath: '../fonts',
                    outputPath: 'fonts/'
                }
            }
        ]
    },
    plugins: [ //多页面配置
        new HtmlWebpackPlugin({
            filename: 'index.html', //输出文件名
            template: path.resolve(__dirname, './src/index.ejs'), //引入文件名
            chunks: ['index','common'], //需要加载的entry，前面有定义过
            excludeChunks: ['node-modules'] //排除的chunks
        }),
        new HtmlWebpackPlugin({
            filename: 'about.html',
            template: path.resolve(__dirname, './src/views/about.html'),
            chunks: ['index','common'],
            excludeChunks: ['node-modules']
        }),
        new Extract('css/main.css') //import的css会打包进入该文件
    ],
    devServer: { //启动服务器配置
        open: true, //自动打开browser
        host: 'localhost', //主机名
        port: 8081 //端口
    }
}