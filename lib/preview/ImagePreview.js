/** @jsx React.DOM */
var React = require("react");

var ControlLayer = require("./ControlLayer");
var Layer = require("./Layer");

var ImagePreview = React.createClass({
	getInitialState: function() {
		return { dragging: false };
	},
	handleDrag: function(dragging, onMove, onUp, layer) {
		this.layer = layer;
		this.mouseMoveHandler = onMove;
		this.mouseUpHandler = onUp;
		this.setState({ dragging: dragging });
	},
	layerLocation: function(e) {
		if(!this.layer) return null;

		var screenPoint = this.refs.svg.getDOMNode().createSVGPoint();
		screenPoint.x = e.pageX;
		screenPoint.y = e.pageY;
		var screenToLayer = this.layer.getDOMNode().getScreenCTM().inverse();
		var layerPoint = screenPoint.matrixTransform(screenToLayer);
		return layerPoint;
	},
	handleMouseMove: function(e) {
		// TODO: use SVGLocatable.getScreenCTM() to provide local coords
		e.canvasX = e.pageX - 272;
		e.canvasY = e.pageY - 30;
		var layerPoint = this.layerLocation(e);
		if(layerPoint) {
			e.layerX = layerPoint.x;
			e.layerY = layerPoint.y;
		}
		this.mouseMoveHandler.apply(null, arguments);
	},
	handleMouseUp: function(e) {
		e.canvasX = e.pageX - 272;
		e.canvasY = e.pageY - 30;
		this.mouseUpHandler.apply(null, arguments);
	},
	render: function() {
		var image = this.props.image;
		var dragging = this.props.dragging;

		var layers = image.layers.map(function(l) {
			return <Layer layer={l} selectLayer={this.props.selectLayer}></Layer>;
		}.bind(this));

		return <div className="image-preview">

				<svg ref="svg" className={dragging ? 'dragging' : 'not-dragging'}
						height={image.height} width={image.width}
						onMouseMove={this.state.dragging ? this.handleMouseMove : Function.noop}
						onMouseUp={this.state.dragging ? this.handleMouseUp : Function.noop}>

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