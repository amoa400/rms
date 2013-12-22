var express = require('express');
var http = require('http');
var loader = require('loader');
var SessionStore = require('session-mongoose')(express);
var fantview = require('./lib/fantview');

var app = express();

// 配置环境
app.configure(function() {
  // 监听端口
  app.set('port', C('port'));
  // 模板存放文件夹
  app.set('views', __dirname + '/views');
  // 模板引擎
  app.set('view engine', 'html');
  // 使用ejs来解析html
  app.engine('html', require('ejs').renderFile);

  // 解析cookie
  app.use(express.cookieParser());
  // 使用session
  app.use(express.session({
    cookie: {maxAge: 20 * 60 * 1000},
    secret: C('session_secret'),
    store: new SessionStore({
      url: 'mongodb://' + C('db').host + '/' + C('db').name,
      interval: 120000
    })
  }));
  // 默认图标
  app.use(express.favicon(__dirname + '/public/favicon.ico'));
  // 开发环境下在终端显示日志
  app.use(express.logger('dev'));
  // 解析请求体，支持json，urlencoded，form-data
  app.use(express.bodyParser());
  // 协助POST请求，伪装其他HTTP方法
  app.use(express.methodOverride());
  // 调用路由器的解析规则
  app.use(app.router);
  // 静态目录文件夹
  app.use(express.static(__dirname + '/public'));
});

// 路由变量
app.locals({
  Loader: loader,
  assetsMap: require('./public/assets.json'),
  brand: C('brand'),
  slogan: C('slogan'),
  root: C('root'),
  domain: C('domain'),
});

// 开发环境下输出错误信息
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// 创建http服务器
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

// 打开路由
require('./lib/route')(app);

module.exports = app;

