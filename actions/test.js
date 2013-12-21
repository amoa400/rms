//var C = require('../config').C;
//var D = require('../models/common').D;
//var crypto = require('crypto');

/**
  * 测评列表
  */
exports.list = function(req, res) {

  //if (req.session.user_id == null) {
  //    req.session.user_id = 123;
  //    console.log(1234567);
  //}
  //req.session.destroy();
  //var auth_token = encrypt('amoa400@163.com', C('session_secret'));
  //console.log(auth_token);
  //res.cookie(config.auth_cookie_name, auth_token, {path: '/', maxAge: 1000 * 60 * 60 * 24 * 30}); //cookie 
  //console.log(req.session);


  /*
   var data = {};
   data.name = '黄偲';
   data.email = 'amoa400@163.com';
   data.password = crypto.createHash('md5').update('lovea400').digest('hex');
   data.company_name = '上海维秦信息科技有限公司';
   data.type_id = 1;
   data.verified = true;
   data.phone = '15216708847';
   console.log(data);
   D('user').c(data, function(err) {
    console.log(err);
  });
*/
  /*
  var data = {};
  data.user_id = '52a2e5e4ccbc9f3c23000002';
  data.name = '饿了么2014校园招聘';
  data.desc = '快到碗里来~';
  data.duration = 30;
  data.start_datetime = new Date();
  data.end_datetime = new Date();
  data.cutoff = 0;
  data.allow_public = true;
  data.need_info = ['name', 'phone'];
  data.allow_lang = ['pascal', 'c++'];
  data.count = {
    question: 0,
    score: 100
  };
  console.log(data);

  var test = D('test');
  test.c(data, function(err) {
    console.log(err);
  });
*/

  res.send('OK');
}

