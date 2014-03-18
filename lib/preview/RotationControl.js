/** @jsx React.DOM */
var React = require("react");

var ControlPoint = require("./ControlPoint");

var RotationControl = React.createClass({
	handleMouseDown: function(e) {
		e.stopPropagation();
		e.preventDefault();
		this.props.handleDrag(true, this.handleDragMove, this.handleDragEnd, this.refs.container);
	},
	handleDragMove: function(e) {
		var pos = this.props.layer.position;

		var dr = Math.atan2(e.layerY, e.layerX) * 360 / 2 / Math.PI + 90;
		pos.r += dr;
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

		return <g ref="container">
				<rect className="rotation-line" 
					x="0"
					y={-height/2-ControlPoint.rotationBarHeight} 
					height={ControlPoint.rotationBarHeight} 
					width={ControlPoint.lineSize}></rect>
				<ControlPoint x="0"
					y={-height/2-ControlPoint.rotationBarHeight} 
					onMouseDown={this.handleMouseDown} />
			   </g>;

	}
});

module.exports = RotationControl;