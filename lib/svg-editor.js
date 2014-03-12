/** @jsx React.DOM */
var React = require("react");
var Layer = require("./layers").Layer;

var initialImage = {
	width: 800,
	height: 600,
	layers: [
		{ type: "text", x: 400, y: 300, r: 20, width: 200, height: 100, text: "Hello, world!"},
		{ type: "text", x: 400, y: 300, r: 0, width: 200, height: 100, text: "Hello, world!"},
		{ type: "rect", x: 20, y: 20, r: 50, width: 20, height: 50, fill: "green" }
	]
};


var SVGEditor = React.createClass({
	getInitialState: function() {
		return { image: initialImage, dragging: false };
	},
	handleDrag: function(dragging, onMove, onUp) {
		this.handleMouseMove = onMove;
		this.handleMouseUp = onUp;
		this.setState({ dragging: dragging });
	},
	updateLayer: function(layer, attrs) {
		for (var k in attrs) {
			layer[k] = attrs[k];
		}
		this.setState({ image: this.state.image });
	},
	render: function() {
		var image = this.state.image;
		var layers = image.layers.map(function(l) {
			return <Layer layer={l} handleDrag={this.handleDrag} update={this.updateLayer}></Layer>;
		}.bind(this));
		var dragging = this.state.dragging;
		return <svg height={image.height} width={image.width}
						onMouseMove={dragging ? this.handleMouseMove : Function.noop}
						onMouseUp={dragging ? this.handleMouseUp : Function.noop}>
					{layers}
				</svg>;
	}
});

React.renderComponent(<SVGEditor/>, document.body);