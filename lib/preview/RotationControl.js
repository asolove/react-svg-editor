/** @jsx React.DOM */
var React = require("react");

var ControlPoint = require("./ControlPoint");

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
		var center = (width-ControlPoint.lineSize)/2;

		return <g>
				<rect className="rotation-line" 
					x={center} 
					y={-ControlPoint.rotationBarHeight} 
					height={ControlPoint.rotationBarHeight} 
					width={ControlPoint.lineSize}></rect>
				<ControlPoint x={center} y={-ControlPoint.rotationBarHeight} onMouseDown={this.handleMouseDown} />
			   </g>;

	}
});

module.exports = RotationControl;