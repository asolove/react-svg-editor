/** @jsx React.DOM */
var React = require("react");

var TextLayerSidebar = React.createClass({
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

module.exports = TextLayerSidebar;