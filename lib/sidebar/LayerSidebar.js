/** @jsx React.DOM */
var React = require("react");

var EmptyLayerSidebar = require("./EmptyLayerSidebar")

var sidebarClassForType = {
	text: require("./TextLayerSidebar"),
	rect: require("./RectLayerSidebar")
};

var layerSidebarForType = function(type){
	return sidebarClassForType[type] || EmptyLayerSidebar;
};

var LayerSidebar = React.createClass({
	render: function() {
		var layer = this.props.layer;
		var layerControls = layerSidebarForType(layer&&layer.type)({layer: layer, updateLayer: this.props.updateLayer});
		return <div className="layer-controls">{layerControls}</div>;
	}
});

module.exports = LayerSidebar;