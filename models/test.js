/**
  * 测评模型
  */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var TestSchema = new Schema({
  // 用户
  user_id: {type: ObjectId, index: true},
  // 名称
  name: String,
  // 描述
  desc: String,
  // 持续时间
  duration: Number,
  // 开始时间
  start_datetime: Date,
  // 结束时间
  end_datetime: Date,
  // 自动通过分数
  cutoff: Number,
  // 公开测评
  allow_public: Boolean,
  // 需要的信息
  need_info: Array,
  // 允许的语言
  allow_lang : Array,
  // 统计数据
  count: {
    question: Number,
    score: Number,
    invited: Number,
    running: Number,
    complete: Number,
    passed: Number,
    failed: Number,
  }
});

mongoose.model('test', TestSchema);

