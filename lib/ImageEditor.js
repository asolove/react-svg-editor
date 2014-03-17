/** @jsx React.DOM */
var React = require("react");

// only used to trigger React Dev Tools
window.React = React;

var ImagePreview = require("./preview/ImagePreview");
var ImageSidebar = require("./sidebar/ImageSidebar");

var emptyLayerOfType = function(type){
	var layer = { type: type, position: { x: 100, y: 30, r: 0, width: 100, height: 50 } }
	if(type == "rect") layer.fill = "red";
	if(type == "text") layer.text = "Text";
	return layer;
};

var ImageEditor = exports.ImageEditor = React.createClass({
	getInitialState: function() {
		return { image: this.props.initialImage, selectedLayer: null };
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

module.exports = ImageEditor;