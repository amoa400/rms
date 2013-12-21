var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

module.exports = {
  // 模型
  schema: new Schema({
    // 名称
    name: String,
    // 邮箱
    email: {type: String, unique: true},
    // 手机
    phone: String,
    // 密码
    password: String,
    // 公司
    company_name: String,
    // 已验证邮箱
    verified: Boolean,
  }),

  // 规则
  rule: [
    ['email', 'empty'],
    ['email', 'length', [2, 40]],
    ['email', 'email'],
    ['email', 'unique'],
    ['password', 'empty'],
    ['password', 'length', [6, 30]],
    ['name', 'empty'],
    ['name', 'length', [2, 20]],
    ['name', 'reg', /^[\u4e00-\u9fa5A-Za-z0-9_-]+$/],
  ]
}
