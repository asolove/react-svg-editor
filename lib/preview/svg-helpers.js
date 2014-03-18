

var transformFor = exports.transformFor = function(options) {
	var r = "";
	if(options.x || options.y) {
		r += "translate(" + (options.x) + "," + (options.y) + ") ";
	}
	if(options.r) {
		r += "rotate(" + options.r + ",0,0) ";
	}
  if(options.scale){
    r += "scale(" + options.scale + ") ";
  }
	return r;
};