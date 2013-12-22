var fs = require('fs');

// 生成views版本表
var viewsVersion;
function generateViewVersion(app) {
  viewsVersion = [];
  var views = require('../views.json');
  var id = 0;
  for (var name in views) {
    var stats = fs.statSync('./views/' + views[name] + '.html');
    for(var i in app.routes.get) {
      if (name == app.routes.get[i].path) {
        viewsVersion.push({
          id: id,
          name: name,
          tpl: views[name],
          reg: app.routes.get[i].regexp.toString(), 
          mtime: stats.mtime.getTime()
        });
        break;
      }
    } 
    id++;
  }
}

module.exports = function(app) {
  // 统一入口
  app.get('*', function(req, res, next) {
    // pjax加载
    if (req.query.pjax === '1') {
      next();
      return;
    }
    // 是否为指定模块
    var params = req.params[0].split('/');
    switch (params[1]) {
      case 'activity':
      case 'position':
        if ('development' == app.get('env')) {
          generateViewVersion(app);
        }
        res.render('layout/admin', {viewsVersion: JSON.stringify(viewsVersion)});
        break;
      default:
        next();
    }
  });

  // 注册登录
  app.get('/signup', A('sign').signup);
  app.get('/signup/:email', A('sign').signup);
  app.post('/signupDo', A('sign').signupDo);
  app.get('/signin', A('sign').signin);
  app.post('/signinDo', A('sign').signinDo);
  app.get('/verify/:userId', A('sign').verify);
  app.get('/verified', A('sign').verified);

  // 动态
  app.get('/activity', A('activity').index);

  // 职位
  app.get('/position', A('position').list);
  app.get('/position/create', A('position').create);

  // 获取视图
  app.get('/getView', function(req, res) {
    if (req.query.id == null) return;
    if (parseInt(req.query.id) >= viewsVersion.length) return;
    res.render(viewsVersion[req.query.id].tpl);
  });

  // 生成视图版本表
  generateViewVersion(app);
};




