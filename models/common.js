var C = require('../config').C;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
mongoose.connect('mongodb://' + C('db').host + '/' + C('db').name);


/**
  * 快速创建原始模型
  *
  * @param {String} modelName 模型名
  */
var originModels = {};
exports.M = function(modelName) {
  if (modelName == null) return;
  if (originModels[modelName] == null) {
    // 获取存放模型的文件名
    var filename = '';
    for (var i = 0; i < modelName.length; i++) {
      if (modelName[i].charCodeAt() >= 65 && modelName[i].charCodeAt() <= 90) {
        if (i != 0) filename += '_';
        filename += String.fromCharCode(modelName[i].charCodeAt() + 32);
        continue;
      }
      filename += modelName[i];
    }
    // 获取模型
    originModels[modelName] = new (require('./' + filename)[modelName + 'Model']);
  }
  return originModels[modelName];
}

/**
  * 快速创建通用模型
  *
  * @param {String} modelName 模型名
  */
var models = {};
exports.D = function(modelName) {
  if (modelName == null) return;
  if (models[modelName] == null) {
    models[modelName] = new exports.CommonModel(modelName);
  }
  return models[modelName];
}

/**
  * 通用模型
  *
  * @param {String} modelName 集合名
  */
exports.CommonModel = function(modelName) {
  var _this = this;
  var model;

  // 初始化函数
  var init = function() {
    model = mongoose.model(modelName, exports.M(modelName).schema);
  }

  /**
    * 创建数据
    *
    * @param {Object} data 要创建的数据
    */
  _this.c = function(data, callback) {
    model.create(data, function(err, ret) {
      if (typeof callback == 'function')
        callback(err, ret);
    });
  }

  /**
    * 更新数据
    *
    * @param {Object} condition 修改条件
    * @param {Object} data 修改数据
    */
    _this.u = function(condition, data, callback) {
      model.update(condition, data, {multi: true}, function(err){
        if (typeof callback == 'function')
          callback(err);
      })
    }

    /**
      * 获取数据
      *
      * @param {Object} condition 查询条件
      * @param {Object} field 查询字段
      * @param {Object} option 查询选项
      */
    _this.r = function(condition, field, option, callback) {
      model.find(condition, field, option, function(err, docs) {
        if (!err && docs.length == 1) docs = docs[0];
        if (typeof callback == 'function') 
          callback(err, docs);
      });
    }

  init();
}



