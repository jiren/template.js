/*
 * template.js
 * 0.0.1 (2015-01-23)
 *
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 * Copyright 2011-2015 Jiren Patel[jirenpatel@gmail.com]
 *
 */
 
 (function(window) {

	var root = this;

	var Template = function(str, data){
		var t = new _template();
		return t.render(str, data);
	};

	root.Template = Template;

	var templateSettings = {
		evaluate    : /<%([\s\S]+?)%>/g,
		interpolate : /<%=([\s\S]+?)%>/g,
		escape      : /<%-([\s\S]+?)%>/g
	};
	
	var escapeStr = function(string) {
		return (''+string).replace(/&/g,  '&amp;')
											.replace(/</g,  '&lt;')
											.replace(/>/g,  '&gt;')
											.replace(/"/g,  '&quot;')
											.replace(/'/g,  '&#x27;')
											.replace(/\//g, '&#x2F;');
	};
	
	var render = function(str, data) {
		var c  = templateSettings; 
	
		var tmpl = 'var __p=[],print=function(){__p.push.apply(__p,arguments);};' +
			'with(obj||{}){__p.push(\'' +
			str.replace(/\\/g, '\\\\')
				 .replace(/'/g, "\\'")
				 .replace(c.escape, function(match, code) {
					 return "',escapeStr(" + code.replace(/\\'/g, "'") + "),'";
				 })
				 .replace(c.interpolate, function(match, code) {
					 return "'," + code.replace(/\\'/g, "'") + ",'";
				 })
				 .replace(c.evaluate || null, function(match, code) {
					 return "');" + code.replace(/\\'/g, "'")
															.replace(/[\r\n\t]/g, ' ') + ";__p.push('";
				 })
				 .replace(/\r/g, '\\r')
				 .replace(/\n/g, '\\n')
				 .replace(/\t/g, '\\t')
				 + "');}return __p.join('');";
	
		var func = new Function('obj', tmpl);
		return data ? func(data) : function(data) { return func(data) };
	};
	
	


	function _template(){ };

	var T = _template.prototype;

	T.render = function(str, data){
		return render(str, data);
	};


}).call(this, window);
