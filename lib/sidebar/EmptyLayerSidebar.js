/** @jsx React.DOM */
var React = require("react");

var EmptyLayerSidebar = React.createClass({
	render: function() {
		return <div className="empty-layer-controls">Select a layer to edit.</div>
	}
});

module.exports = EmptyLayerSidebar;