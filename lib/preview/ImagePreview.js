/** @jsx React.DOM */
var React = require("react");

var ControlLayer = require("./ControlLayer");
var Layer = require("./Layer");

var ImagePreview = React.createClass({
	getInitialState: function() {
		return { dragging: false };
	},
	handleDrag: function(dragging, onMove, onUp) {
		console.log("Dragging?", dragging);
		this.handleMouseMove = onMove;
		this.handleMouseUp = onUp;
		this.setState({ dragging: dragging });
	},
	render: function() {
		var image = this.props.image;
		var dragging = this.props.dragging;

		var layers = image.layers.map(function(l) {
			return <Layer layer={l} selectLayer={this.props.selectLayer}></Layer>;
		}.bind(this));

		return <div className="image-preview">

				<svg className={dragging ? 'dragging' : 'not-dragging'}
						height={image.height} width={image.width}
						onMouseMove={this.handleMouseMove ? this.handleMouseMove : Function.noop}
						onMouseUp={this.handleMouseUp ? this.handleMouseUp : Function.noop}>

					{/* image layers */}
					{layers}

					{/* control layers */}
					<ControlLayer layer={this.props.selectedLayer} 
						handleDrag={this.handleDrag} 
						update={this.props.updateLayer}/>
				</svg>
			   </div>;
	}
});

module.exports = ImagePreview;