/** @jsx React.DOM */
var React = require("react");

var RectLayerSidebar = React.createClass({
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

module.exports = RectLayerSidebar;