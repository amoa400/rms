var func = function() {}
module.exports = func;

/**
  * 是否为空对象
  *
  * @param {Object} obj 对象
  */  
func.isEmptyObject = function(obj) {
  if (obj == null) return false;
  for (var i in obj) {
    return false;
  }
  return true;
}

/**
  * 发送邮件
  *
  * @param {String} to 收信人
  * @param {String} subject 主题
  * @param {String} html 邮件内容
  */
func.sendMail = function(to, subject, html) {
  var data = {};
  data.to = to;
  data.subject = subject;
  data.html = html;
  D('mail').c(data, function(err, ret) {
    var cp = require('child_process');
    cp.exec('node ./bin/send_mail.js ' + ret._id);
  });
}

/**
  * 不可逆加密
  *
  * @param {String} message 要加密的信息
  */
func.encrypt =  function(message) {
  var crypto = require('crypto');
  return crypto.createHash('sha1').update(message.toString()).digest('hex');
}

/**
  * 简单可逆加密
  *
  * @param {String} message 要加密的信息
  */
func.cipher = function(message) {
  var crypto = require('crypto');
  var cipher = crypto.createCipher('aes-256-cbc', C('cipher_secret'));
  return cipher.update(message.toString(),'utf8','hex') + cipher.final('hex');
}

/**
  * 简单可逆解密
  *
  * @param {String} message 要解密的信息
  */
func.decipher = function(message) {
  var crypto = require('crypto');
  var decipher = crypto.createDecipher('aes-256-cbc', C('cipher_secret'));
  try {
    return decipher.update(message,'hex','utf8') + decipher.final('utf8');
  } catch (e) {
    return false;
  }
}
