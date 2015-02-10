(function(window, document) {

  'use strict';

	var root = this;

	var Template = function(eleId, data){
    return render(eleId, data)
	};

  root.Template = Template;

	/* inject src/template.js */

}).call(this, window, document);
