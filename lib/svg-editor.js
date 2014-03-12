/** @jsx React.DOM */
var React = require("react");

var image = {
	width: 800,
	height: 600,
	layers: [
		{ type: "text", x: 400, y: 300, r: 20, width: 200, height: 100, text: "Hello, world!"},
		{ type: "text", x: 400, y: 300, r: 0, width: 200, height: 100, text: "Hello, world!"}
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
}

var TextLayer = React.createClass({
	render: function() {
		var layer = this.props.layer;
		return <g transform={transformFor(layer)}>
			<text x={layer.width/2} y={layer.height/2} textAnchor="middle">{layer.text}</text>
		</g>;
	}
});

var SVGEditor = React.createClass({
	render: function() {
		var layers = this.props.image.layers.map(function(l) {
			return <TextLayer layer={l}></TextLayer>;
		});
		return <svg height={this.props.image.height} width={this.props.image.width}>
			{layers}
		</svg>;
	}
});

React.renderComponent(<SVGEditor image={image}/>, document.body);