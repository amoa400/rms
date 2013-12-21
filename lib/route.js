
//var index = require('../controllers/index');
//var sign = require('../actions/sign');
//var test = require('../actions/test');

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
        res.render('layout/admin');
        break;
      default:
        next();
    }
  });

  // 主页
  //app.get('/', index.index);

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

  // 测评
  //app.get('/tests', test.list);
};
