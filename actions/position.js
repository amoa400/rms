var action = new Action(); 
module.exports = action;

/**
  * 职位列表
  */
action.list = function(req, res) {
  res.render('position/list');
}

/**
  * 新建职位
  */
action.create = function(req, res) {
  res.send('123');
}

