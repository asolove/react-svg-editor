/** @jsx React.DOM */

var React = require("react");

var ImagePreview = require("./image_preview").ImagePreview;
var ImageSidebar = require("./image_sidebar").ImageSidebar;


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
	var layer = { type: type, position: { x: 100, y: 30, r: 0, width: 100, height: 50 } }
	if(type == "rect") layer.fill = "red";
	if(type == "text") layer.text = "Text";
	return layer;
};

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
					<ImageSidebar layer={this.state.selectedLayer} 
						addLayer={this.addLayer} 
						updateLayer={this.updateLayer}/>
					<ImagePreview image={this.state.image}
						selectedLayer={this.state.selectedLayer}
						selectLayer={this.selectLayer} 
						updateLayer={this.updateLayer} />
			</div>;
	}
});

React.renderComponent(<ImageEditor/>, document.body);