/** @jsx React.DOM */
var React = require("react");
var Layer = require("./layers").Layer;
var ControlLayer = require("./layers").ControlLayer;

var initialImage = {
	width: 800,
	height: 600,
	layers: [
		{ type: "text", position: { x: 400, y: 300, r: 20, width: 200, height: 100 }, text: "Hello, world!"},
		{ type: "text", position: { x: 400, y: 300, r: 0, width: 200, height: 100 }, text: "Hello, world!"},
		{ type: "rect", position: { x: 20, y: 20, r: 50, width: 20, height: 50 }, fill: "green" }
	]
};

var emptyLayerOfType = function(type){
	var layer = { type: type, position: { x: 0, y: 0, r: 0, width: 100, height: 30 } }
	if(type == "rect") layer.fill = "red";
	if(type == "text") layer.text = "Text";
	return layer;
};

var ImagePreview = React.createClass({
	getInitialState: function() {
		return { dragging: false };
	},
	handleDrag: function(dragging, onMove, onUp) {
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
						onMouseMove={dragging ? this.handleMouseMove : Function.noop}
						onMouseUp={dragging ? this.handleMouseUp : Function.noop}>

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

var LayerControls = React.createClass({
	render: function() {
		return <div className="layer-controls">

		</div>;
	}
});

var ImageSidebar = React.createClass({
	render: function() {
		return <div className="image-sidebar">
			<h1>SVG Image Editor</h1>
			<div className="add-layer">
				<strong>Add layer: </strong>
				<button onClick={this.props.addLayer.bind(this, 'text')}>Text</button>
				<button onClick={this.props.addLayer.bind(this, 'rect')}>Rect</button>
			</div>

			<LayerControls layer={this.props.layer}/>
		</div>;
	}
});

var ImageEditor = React.createClass({
	getInitialState: function() {
		return { image: initialImage, selectedLayer: null };
	},
	updateLayer: function(layer, attrs) {
		for (var k in attrs) {
			layer[k] = attrs[k];
		}
		this.setState({ image: this.state.image });
	},
	selectLayer: function(layer) {
		this.setState({ selectedLayer: layer });
	},
	addLayer: function(type) {
		var layer = emptyLayerOfType(type);
		this.state.image.layers.push(layer);
		this.setState({ image: this.state.image });
	},
	render: function() {
		return <div className="image-editor">
					<ImageSidebar layer={this.state.selectedLayer} addLayer={this.addLayer}/>
					<ImagePreview image={this.state.image} selectedLayer={this.state.selectedLayer}
						selectLayer={this.selectLayer} updateLayer={this.updateLayer} />
			</div>;
	}
});

React.renderComponent(<ImageEditor/>, document.body);