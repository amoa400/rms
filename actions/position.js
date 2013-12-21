var action = new Action(); 
module.exports = action;

/**
  * 注册页面
  */
action.list = function(req, res) {
  res.render('position/list', {pageTitle: '注册 - 加入' + C('brand'), email: req.params.email});
}

