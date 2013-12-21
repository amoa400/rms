// 获取object里的元素个数
function object_count(o){
	var t = typeof o;
	if(t == 'string') {
		return o.length;
	} else 
	if(t == 'object') {
		var n = 0;
		for(var i in o) {
			n++;
		}
		return n;
	}
	return false;
}

// 显示内容
function dump(obj) {
	var div = $('<div></div>');
	div.css('position', 'fixed');
	div.css('top', '20px');
	div.css('left', '20px');
	div.css('background', 'white');
	div.css('padding', '10px');
	div.css('border', '1px solid black');
	div.css('max-width', '800px');
	div.css('max-height', '550px');
	div.css('overflow', 'auto');
	div.css('z-index', '9999');
	var s = '';
	var type = typeof obj;
	if (type == 'object' || type == 'array') {
		for (var i in obj) {
			s += i + ' ==> ' + obj[i] + '<br>';
		}
	}
	else s += type + ' ==> ' +obj + '<br>';
	s += '<br><span style="cursor:pointer;" onclick="$(this).parent().remove()">关闭</span>';
	div.html(s);
	div.appendTo('body');
}

// 是否为邮箱
function isEmail(s) {
	var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
	if (!reg.test(s)) return false;
	else return true;
}

// 获取innerText
function getInnerText(obj) {
	if(obj.innerText)
		return obj.innerText;
	
	var t = ""; 
	obj = obj.childNodes || obj; 
	for(var i = 0; i < obj.length; i++) {
		if(obj[i].nodeType == 3)
			t += obj[i].nodeValue;
		else
			t += getInnerText(obj[i].childNodes);
	}
	return t;
} 

// 返回int
function rt(a) {
	return parseInt(a);
}
