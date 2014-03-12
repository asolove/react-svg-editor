/** @jsx React.DOM */
var React = require("react");

var imageData = {
	width: 800,
	height: 600,
	layers: [
		{ type: "text", x: 400, y: 300, r: 20, width: 200, height: 100, text: "Hello, world!"},
		{ type: "text", x: 400, y: 300, r: 0, width: 200, height: 100, text: "Hello, world!"},
		{ type: "image", x: 0, y: 0, r: 0, width: 200, height: 40, url: "http://d1x1klo9zku3iu.cloudfront.net/assets/external/posts/top_image-0fa5445043c1dcc1a879d74e7c15bf23.jpg" }
	]
};

var transformFor = function(options) {
	var r = "";
	if(options.x || options.y) {
		r += "translate(" + options.x + "," + options.y + ") ";
	}
	if(options.r) {
		r += "rotate(" + options.r + "," + options.width/2 + "," + options.height/2 + ") ";
	}
	return r;
};

var TextLayer = React.createClass({
	render: function() {
		var layer = this.props.layer;
		return <g transform={transformFor(layer)}>
			<text x={layer.width/2} y={layer.height/2} textAnchor="middle">{layer.text}</text>
		</g>;
	}
});

var ImageLayer = React.createClass({
	render: function() {
		var layer = this.props.layer;
		return React.DOM.image({ width: layer.width, height: layer.height, "href": layer.url });
	}
});

var concreteClassForType = {
	text: TextLayer,
	image: ImageLayer
};

var Layer = React.createClass({
	render: function() {
		return this.transferPropsTo(concreteClassForType[this.props.layer.type]());
	}
})

var SVGEditor = React.createClass({
	render: function() {
		var image = this.props.image;
		var layers = image.layers.map(function(l) {
			return <Layer layer={l}></Layer>;
		});
		var svgOpts = { height: image.height, width: image.width,
										xmlns: "http://www.w3.org/2000/svg",
     									"xmlns:xlink": "http://www.w3.org/1999/xlink" };
		return React.DOM.svg.apply(null, [svgOpts].concat(layers));
	}
});

React.renderComponent(<SVGEditor image={imageData}/>, document.body);