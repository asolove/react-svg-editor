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
	handleResizeStart: function(e) {
		e.stopPropagation();
		this.props.handleDrag(true, this.handleResizeMove, this.handleResizeEnd, this.refs.container);
	},
	handleResizeMove: function(e) {
		var layer = this.props.layer;
		var pos = layer.position;

		var z0 = Math.sqrt(Math.pow(pos.width/2, 2) + Math.pow(pos.height/2, 2));
		var z1 = Math.sqrt(Math.pow(e.layerX, 2) + Math.pow(e.layerY, 2));

		pos.scale = (pos.scale || 1) * z1 / z0;

		this.props.update(layer, {
			position: layer.position
		});
	},
	handleResizeEnd: function(e) {
		this.props.handleDrag(false);
	},
	handleStretchStart: function(e) {
		e.stopPropagation();
		this.setState({ lastMouseX: e.pageX, lastMouseY: e.pageY, controlPoint: e.target });
		this.props.handleDrag(true, this.handleStretchMove, this.handleStretchEnd, this.refs.container);
	},
	handleStretchMove: function(e) {
		if (!this.state.controlPoint) return;
		try {
			var x = parseInt(this.state.controlPoint.attributes.x.value, 10);
			var y = parseInt(this.state.controlPoint.attributes.y.value, 10);
		} catch(err) {
			return;
		}
		var layer = this.props.layer;
		var change = 0;
		x = x + ControlPoint.controlPointOffset - 0.5;
		y = y + ControlPoint.controlPointOffset - 0.5;
		if (x !== 0) {
			change = e.pageX - this.state.lastMouseX;
			if (x < 0) {
				change = -change;
			}
			layer.position.width += change;
		} else if (y !== 0) {
			change = e.pageY - this.state.lastMouseY;
			if (y < 0) {
				change = -change;
			}
			layer.position.height += change;
		}
		if (layer.position.width > 0 && layer.position.height > 0) {
			this.props.update(layer, {
				position: layer.position
			});
		}
		this.setState({ lastMouseX: e.pageX, lastMouseY: e.pageY });
	},
	handleStretchEnd: function(e) {
		this.props.handleDrag(false);
		this.setState({controlPoint: null});
	},
	render: function() {
		if(!this.props.layer) return <g></g>;
		var layer = this.props.layer;
		var pos = layer.position;

		var width = layer.position.width;
		var height = layer.position.height;

		var resizeControlPointLocations = [
			[-width/2, -height/2],
			[width/2, -height/2],
			[-width/2, height/2],
			[width/2, height/2]
		];

		var keyIndex = -1;
		var controlPoints = resizeControlPointLocations.map(function(location){
			keyIndex++;
			return ControlPoint({ x: location[0], y: location[1], onMouseDown: this.handleResizeStart, key: keyIndex });
		}.bind(this));

		var stretchControlPointLocations = [
			[-width/2, 0],
			[width/2, 0],
			[0, -height/2],
			[0, height/2]
		];
		controlPoints = controlPoints.concat(stretchControlPointLocations.map(function(location){
			keyIndex++;
			return ControlPoint({ x: location[0], y: location[1], onMouseDown: this.handleStretchStart, key: keyIndex });
		}.bind(this)));

		return <g ref="container" transform={h.transformFor(layer.position)} onMouseDown={this.handleMouseDown}>
				  <rect className='halo' x={-pos.width/2} y={-pos.height/2} width={pos.width} height={pos.height}></rect>

				  {controlPoints}
				  
				  <RotationControl
				  	layer={layer}
				  	update={this.props.update}
				  	handleDrag={this.props.handleDrag} />
				 </g>;
	}
});

module.exports = ControlLayer;