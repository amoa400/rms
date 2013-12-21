var config = require('./config');

var actions = {};
var models = {};
var originModels = {};

/**
  * 输出调试信息
  *
  * @param {String} message 信息
  */
global.W = function(message) {
  console.log(message);
}

/**
  * 创建控制器
  *
  * @param {String} name 控制器名称
  */
global.A = function(name) {
  require('./action');
  if (actions[name] == null) {
    actions[name] = require('../actions/' + name);
  }
  return actions[name];
}

/**
  * 创建模型
  *
  * @param {String} name 模型名称
  */
global.D = function(name) {
  require('./model');
  if (models[name] == null) {
    models[name] = new Model(name);
  }
  return models[name];
}

/**
  * 创建原始模型
  *
  * @param {String} name 原始模型名称
  */
global.M = function(name) {
  if (originModels[name] == null) {
    originModels[name] = require('../models/' + name);
  }
  return originModels[name];
}

/**
  * 读取配置文件
  *
  * @param {String} name 配置名称
  */
global.C = function(name) {
  return config[name];
}

/**
  * 读取公共函数
  */
global.F = function() {
  return require('./function');
}

/**
  * 验证数据是否正确
  *
  * @param {Object} data 数据
  * @param {Array} rule 数据规则
  */
global.V = function(data, rule) {
  var check = require('validator').check;
  var ret = {};
  for (var name in data) {
    for (var i in rule) {
      if (name != rule[i][0]) continue;
      var type = rule[i][1];
      var para = rule[i][2];
      if (ret[name] != null) continue;

      // 查看错误
      try {
        // 是否为空
        if (type == 'empty')
          check(data[name]).notEmpty();
        // 长度
        if (type == 'length')
          check(data[name]).len(para[0], para[1]);
        // 是否为邮箱
        if (type == 'email')
          check(data[name]).isEmail();
        // 正则表达式
        if (type == 'reg') {
          check(data[name]).regex(para);
        }
      } catch(e) {
        if (type == 'empty')
          ret[name] = '不能为空';
        if (type == 'length')
          ret[name] = '长度应为' + para[0] + '-' + para[1] + '位';
        if (type == 'email')
          ret[name] = '格式错误';
        if (type == 'reg')
          ret[name] = '格式错误';
      }
    }
  }
  return ret;
}
