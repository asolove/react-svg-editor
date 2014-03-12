/** @jsx React.DOM */

var React = require("react");

var EmtpyLayerControls = React.createClass({
	render: function() {
		return <div className="empty-layer-controls">Select a layer to edit.</div>
	}
});

var TextLayerControls = React.createClass({
	handleChange: function(e) {
		this.props.updateLayer(this.props.layer, {text: e.target.value});
	},
	render: function() {
		return <dl>
				<dt>Text</dt>
				<dd><input onChange={this.handleChange} value={this.props.layer.text}/></dd>
			</dl>;
	}
});

var RectLayerControls = React.createClass({
	handleChange: function(e) {
		this.props.updateLayer(this.props.layer, {fill: e.target.value});
	},
	render: function() {
		return <dl>
				<dt>Fill</dt>
				<dd><input onChange={this.handleChange} value={this.props.layer.fill}/></dd>
			</dl>;
	}
});

var layerControlsOfType = function(type){
	switch(type){
		case "text": return TextLayerControls;
		case "rect": return RectLayerControls;
	}
	return EmtpyLayerControls;
}

var LayerControls = React.createClass({
	render: function() {
		var layer = this.props.layer;
		var layerControls = layerControlsOfType(layer&&layer.type)({layer: layer, updateLayer: this.props.updateLayer});
		return <div className="layer-controls">{layerControls}</div>;
	}
});

var ImageSidebar = exports.ImageSidebar = React.createClass({
	render: function() {
		return <div className="image-sidebar">
			<h1>SVG Image Editor</h1>
			<div className="add-layer">
				<strong>Add layer: </strong>
				<button onClick={this.props.addLayer.bind(this, 'text')}>Text</button>
				<button onClick={this.props.addLayer.bind(this, 'rect')}>Rect</button>
			</div>

			<LayerControls layer={this.props.layer} updateLayer={this.props.updateLayer}/>
		</div>;
	}
});
