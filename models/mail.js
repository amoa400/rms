var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

module.exports = {
  // 模型
  schema: new Schema({
    // 邮箱地址
    to: String,
    // 主题
    subject: String,
    // 内容
    html: String
  }),

  // 规则
  rule: [
  ]
}
