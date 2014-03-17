

var transformFor = exports.transformFor = function(options) {
	var r = "";
	if(options.x || options.y) {
		r += "translate(" + options.x + "," + options.y + ") ";
	}
	if(options.r) {
		r += "rotate(" + options.r + "," + options.width/2 + "," + options.height/2 + ") ";
	}
	return r;
};