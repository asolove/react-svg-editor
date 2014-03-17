/** @jsx React.DOM */
var React = require("react");

var ControlPoint = require("./ControlPoint");

var RotationControl = React.createClass({
	handleMouseDown: function(e) {
		e.stopPropagation();
		e.preventDefault();
		this.props.handleDrag(true, this.handleDragMove, this.handleDragEnd);
	},
	handleDragMove: function(e) {
		var pos = this.props.layer.position;
		var dx = e.canvasX - pos.x;
		var dy = e.canvasY - pos.y;

		pos.r = Math.atan2(dy, dx) * 360 / 2 / Math.PI + 90;
		this.props.update({ position: pos });
	},
	handleDragEnd: function(e) {
		this.props.handleDrag(false);
	},
	render: function() {
		var layer = this.props.layer;
		var pos = layer.position;

		var width = layer.position.width;
		var height = layer.position.height;
		var center = (width-ControlPoint.lineSize)/2;

		return <g>
				<rect className="rotation-line" 
					x={center} 
					y={-ControlPoint.rotationBarHeight} 
					height={ControlPoint.rotationBarHeight} 
					width={ControlPoint.lineSize}></rect>
				<ControlPoint x={center} 
					y={-ControlPoint.rotationBarHeight} 
					onMouseDown={this.handleMouseDown} />
			   </g>;

	}
});

module.exports = RotationControl;