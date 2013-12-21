var action = new Action(); 
module.exports = action;

/**
  * 注册页面
  */
action.signup = function(req, res) {
  res.render('sign/signup', {pageTitle: '注册 - 加入' + C('brand'), email: req.params.email});
}

/**
  * 注册处理
  */
action.signupDo = function(req, res) {
  var data = {};
  data.email = req.body.email;
  data.name = req.body.name;
  data.password = req.body.password;
  data.verified = false;

  var error = V(data, M('user').rule);
  if (!F().isEmptyObject(error)) {
    res.send(JSON.stringify({status: 'fail', tip: error}));
    return;
  }
  data.password = F().encrypt(data.password);

  D('user').c(data, function(err, doc) {
    if (err) {
      res.send(JSON.stringify({status: 'fail', tip: {email: '邮箱已存在'}}));
      return;
    }

    // 发送邮件
    var mail = {};
    mail.title = '欢迎注册fantview，立即验证邮箱';
    mail.username = data.name;
    mail.cont = '欢迎注册fantview，请点击下面的链接完成验证，开启一场新的测评！';
    mail.link = C('root') + '/active/' + F().cipher(data.email);
    res.render('mail/sign', mail, function(err, html) {
      F().sendMail(data.email, mail.title, html);
    });

    // 登录成功
    action.signinSuccess(req.session, doc._id, function() {
      res.send(JSON.stringify({status: 'success', jumpUrl: '/verify/' + doc._id}));
    });
  });
}

/**
  * 登录页面
  */
action.signin = function(req, res) {
  res.render('sign/signin', {pageTitle: '注册 - 加入' + C('brand')});
}

/**
  * 登录处理
  */
action.signinDo = function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  D('user').r({email: email}, '_id email password', null, function(err, doc) {
    if (F().isEmptyObject(doc)) {
      res.send(JSON.stringify({status: 'fail', tip: {email: '邮箱不存在'}}));
    }
    else
    if (F().encrypt(password) != doc.password) {
      res.send(JSON.stringify({status: 'fail', tip: {password: '密码错误'}}));
    } else {
      action.signinSuccess(req.session, doc._id, function() {
        res.send(JSON.stringify({status: 'success', jumpUrl: '/activity'}));
      });
    }
  });
}

/**
  * 登录成功
  *
  * @param {String} userId 用户编号
  */
action.signinSuccess = function(session, userId, callback) {
  D('user').r({_id: userId}, '_id name', null, function(err, doc) {
    if (err) return;
    session.userId = doc._id;
    session.userName = doc.name;
    session.save();
    if (typeof callback == 'function')
      callback();
  });
}

/**
  * 验证邮箱
  */
action.verify = function(req, res) {
  D('user').r({_id: req.params.userId}, '_id email', null, function(err, doc) {
    var mailUrl = 'http://mail.' + doc.email.split('@')[1];
    res.render('sign/verify', {pageTitle: '验证邮箱 - 加入' + C('brand'), mailUrl: mailUrl});
  });
}

/**
  * 验证成功
  */
action.verified = function(req, res) {
  res.render('sign/verified', {pageTitle: '验证成功 - 加入' + C('brand')});
}


