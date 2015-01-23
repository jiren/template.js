(function(window) {

	var root = this;

	var Template = function(str, data){
		var t = new _template();
		return t.render(str, data);
	};

	root.Template = Template;

	/* inject src/template.js */

	function _template(){ };

	var T = _template.prototype;

	T.render = function(str, data){
		return render(str, data);
	};


}).call(this, window);
