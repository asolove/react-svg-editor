/** @jsx React.DOM */
var React = require("react");

var ControlPoint = React.createClass({
	render: function() {
		return <rect className="control-point" 
					x={this.props.x-ControlPoint.controlPointOffset} 
					y={this.props.y-ControlPoint.controlPointOffset} 
					height={ControlPoint.controlPointSize} 
					width={ControlPoint.controlPointSize}
					onMouseDown={this.props.onMouseDown}></rect>;
	}
});

ControlPoint.lineSize = 1;
ControlPoint.controlPointSize = 10;
ControlPoint.controlPointOffset = (ControlPoint.controlPointSize - ControlPoint.lineSize) / 2;
ControlPoint.rotationBarHeight = 30;

module.exports = ControlPoint;