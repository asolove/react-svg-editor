/** @jsx React.DOM */
var React = require("react");

var ControlPoint = require("./ControlPoint");
var RotationControl = require("./RotationControl");
var h = require("./svg-helpers");

var ControlLayer = React.createClass({
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

		return <g transform={h.transformFor(layer.position)} onMouseDown={this.handleMouseDown}>
				  <rect className='halo' x="0" y="0" width={pos.width} height={pos.height}></rect>
				  {controlPoints}
				  <RotationControl layer={layer} handleDrag={this.props.handleDrag} />
				 </g>;
	}
});

module.exports = ControlLayer;