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

var compile = function(str, objs) {
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
			 + "');};return __p.join('');";

  try {
    var func = new Function('obj', 'render', tmpl);
  } catch (e) {
    e.source = tmpl;
    throw e;
  }

  return objs ? func(objs, render) : function(objs) { return func(objs, render) };
};


var tmplCache = {};

function render(eleId, objs, options){
  var tmpl = tmplCache[eleId], html;

  if(!tmpl){
    html = document.getElementById(eleId).text;
    tmpl = tmplCache[eleId] = compile(html)
  }

  if(!options){
    objs.__index = 0;
    return tmpl(objs);
  }

  if(options.as == 'collection'){
    var index = 0;
    return objs.map(function(obj){ 
      obj.__index = index++;
      return tmpl(obj);
    }).join(''); 
  }
};
