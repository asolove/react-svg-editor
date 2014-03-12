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
		var pos = layer.position;
		return <text x={pos.width/2} y={pos.height/2} textAnchor="middle">{layer.text}</text>;
	}
});

var RectLayer = exports.RectLayer = React.createClass({
	render: function() {
		var layer = this.props.layer;
		var pos = layer.position;
		var style = { fill: layer.fill || "transparent" };
		return <rect className={layer.className} style={style}
					x="0" y="0" width={pos.width} height={pos.height}></rect>;
	}
});


var concreteClassForType = {
	text: TextLayer,
	rect: RectLayer
};

var Layer = exports.Layer = React.createClass({
	handleMouseDown: function(e) {
		this.props.selectLayer(this.props.layer);
	},
	render: function() {
		var layer = this.props.layer;
		var child = this.transferPropsTo(concreteClassForType[layer.type]());
		return <g transform={transformFor(layer.position)} onMouseDown={this.handleMouseDown}>
				  {child}
				</g>;
	}
});

var ControlLayer = exports.ControlLayer = React.createClass({
	getInitialState: function() {
		return { mouseDown: false, lastMouseX: 0, lastMouseY: 0 };
	},
	handleMouseDown: function(e) {
		this.props.handleDrag(true, this.handleMouseMove, this.handleMouseUp)
		this.setState({ mouseDown: true, lastMouseX: e.pageX, lastMouseY: e.pageY });
	},
	handleMouseUp: function(e) {
		this.setState({ mouseDown: false });
		this.props.handleDrag(false);
	},
	handleMouseMove: function(e) {
		var layer = this.props.layer;
		var newPosition = Object.create(layer.position);
		newPosition.x += e.pageX - this.state.lastMouseX;
		newPosition.y += e.pageY - this.state.lastMouseY;

		this.props.update(layer, { 
			position: newPosition
		});
		this.setState({ lastMouseX: e.pageX, lastMouseY: e.pageY });
	},	
	render: function() {
		if(!this.props.layer) return <g></g>;
		var layer = this.props.layer;
		var halo = { type: 'rect', className: 'halo', position: layer.position };
		var child = this.transferPropsTo(concreteClassForType[layer.type]());
		return <g transform={transformFor(layer.position)} onMouseDown={this.handleMouseDown}>
				  <RectLayer layer={halo}></RectLayer>
				</g>;
	}
});