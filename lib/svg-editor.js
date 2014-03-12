/** @jsx React.DOM */
var React = require("react");

var Greeting = React.createClass({
	render: function(){
		return <h1>Hello, {this.props.name}!</h1>;
	}
});

React.renderComponent(<Greeting name="Adam"/>, document.body);