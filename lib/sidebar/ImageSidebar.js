/** @jsx React.DOM */
var React = require("react");

var LayerSidebar = require("./LayerSidebar")

var ImageSidebar = React.createClass({
	render: function() {
		return <div className="image-sidebar">
			<h1>SVG Image Editor</h1>
			<div className="add-layer">
				<strong>Add layer: </strong>
				<button onClick={this.props.addLayer.bind(null, 'text')}>Text</button>
				<button onClick={this.props.addLayer.bind(null, 'rect')}>Rect</button>
			</div>

			<LayerSidebar layer={this.props.layer} updateLayer={this.props.updateLayer}/>
		</div>;
	}
});

module.exports = ImageSidebar;