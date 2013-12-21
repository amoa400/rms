var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fantview');

/**
  * 公共模型
  *
  * @param {String} name 模型名称
  */
global.Model = function(name) {
  this.model = mongoose.model(name, M(name).schema);
}

/**
  * 创建数据
  *
  * @param {Object} data 要创建的数据
  */
Model.prototype.c = function(data, callback) {
  this.model.create(data, function(err, ret) {
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
Model.prototype.u = function(condition, data, callback) {
  this.model.update(condition, data, {multi: true}, function(err){
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
Model.prototype.r = function(condition, field, option, callback) {
  this.model.find(condition, field, option, function(err, docs) {
    if (!err && docs.length == 1) docs = docs[0];
    if (typeof callback == 'function') 
      callback(err, docs);
  });
}


/**
  * 删除数据
  *
  * @param {Object} condition 删除条件
  * @param {Object} data 修改数据
  */
Model.prototype.d = function(condition, callback) {
  this.model.remove(condition, function(err){
    if (typeof callback == 'function')
      callback(err);
  })
}