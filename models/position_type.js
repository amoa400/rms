/**
  * 测评模型
  */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var TestSchema = new Schema({
  // 名称
  name: String,
  // 子类
  child: Object
});

mongoose.model('position_type', TestSchema);

