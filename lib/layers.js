/** @jsx React.DOM */
var React = require("react");

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

var TextLayer = exports.TextLayer = React.createClass({
	render: function() {
		var layer = this.props.layer;
		return <text x={layer.width/2} y={layer.height/2} textAnchor="middle">{layer.text}</text>;
	}
});

var RectLayer = exports.RectLayer = React.createClass({
	render: function() {
		var layer = this.props.layer;
		var style = { fill: layer.fill };
		return <rect x="0" y="0" width={layer.width} height={layer.height} style={style}></rect>;
	}
});


var concreteClassForType = {
	text: TextLayer,
	rect: RectLayer
};

var Layer = exports.Layer = React.createClass({
	getInitialState: function() {
		return { mouseDown: false, lastMouseX: 0, lastMouseY: 0 };
	},
	handleMouseDown: function(e) {
		this.props.handleDrag(true, this.handleMouseMove.bind(this), this.handleMouseUp.bind(this))
		this.setState({ mouseDown: true, lastMouseX: e.pageX, lastMouseY: e.pageY });
	},
	handleMouseUp: function(e) {
		this.setState({ mouseDown: false });
		this.props.handleDrag(false);
	},
	handleMouseMove: function(e) {
		var layer = this.props.layer;
		this.props.update(layer, { 
			x: layer.x + e.pageX - this.state.lastMouseX,
			y: layer.y + e.pageY - this.state.lastMouseY
		});
		this.setState({ lastMouseX: e.pageX, lastMouseY: e.pageY });
	},
	render: function() {
		var layer = this.props.layer;
		var child = this.transferPropsTo(concreteClassForType[layer.type]());
		return <g transform={transformFor(layer)}
				  	onMouseDown={this.state.mouseDown ? Function.noop : this.handleMouseDown}>
				  {child}
				</g>;
	}
})