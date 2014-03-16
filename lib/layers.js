/** @jsx React.DOM */

var React = require("react");

// Control style constants

var controlLineSize = 1;
var controlPointSize = 10;
var controlPointOffset = (controlPointSize - controlLineSize) / 2;
var rotationBarHeight = 30;

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

var ControlPoint = React.createClass({
	render: function() {
		return <rect className="control-point" 
					x={this.props.x-controlPointOffset} 
					y={this.props.y-controlPointOffset} 
					height={controlPointSize} 
					width={controlPointSize}></rect>;
	}
});

var RotationControl = React.createClass({
	handleMouseDown: function(e) {
		console.log("hello!")
		e.stopPropagation();
		e.preventDefault();
		this.props.handleDrag(true, this.handleDragMove, handleDragEnd);
	},
	handleDragMove: function(e) {
		console.log(e.pageX, e.pageY);
	},
	handleDragEnd: function(e) {

	},
	render: function() {
		var layer = this.props.layer;
		var pos = layer.position;

		var width = layer.position.width;
		var height = layer.position.height;
		var center = (width-controlLineSize)/2;

		return <g>
				<rect className="rotation-line" 
					x={center} 
					y={-rotationBarHeight} 
					height={rotationBarHeight} 
					width={controlLineSize}></rect>
				<ControlPoint x={center} y={-rotationBarHeight} onMouseDown={this.handleMouseDown} />
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

		layer.position.x += e.pageX - this.state.lastMouseX;
		layer.position.y += e.pageY - this.state.lastMouseY;

		this.props.update(layer, { 
			position: layer.position
		});
		this.setState({ lastMouseX: e.pageX, lastMouseY: e.pageY });
	},	
	render: function() {
		if(!this.props.layer) return <g></g>;
		var layer = this.props.layer;
		var pos = layer.position;

		var width = layer.position.width;
		var height = layer.position.height;

		var controlPointLocations = [[0, 0], [width, 0], [0, height], [width, height]];

		var controlPoints = controlPointLocations.map(function(location){
			return ControlPoint({ x: location[0], y: location[1] });
		});

		return <g transform={transformFor(layer.position)} onMouseDown={this.handleMouseDown}>
				  <rect className='halo' x="0" y="0" width={pos.width} height={pos.height}></rect>
				  {controlPoints}
				  <RotationControl layer={layer} handleDrag={this.props.handleDrag} />
				 </g>;
	}
});