/** @jsx React.DOM */
var ImageEditor = require("./lib/ImageEditor");

var initialImage = {
	width: 800,
	height: 600,
	layers: [
		{ type: "text", position: { scale: 1, x: 400, y: 300, r: 20, width: 200, height: 100 }, text: "Hello, world!"},
		{ type: "text", position: { scale: 1.6, x: 400, y: 300, r: 90, width: 200, height: 100 }, text: "Hello, world!"},
		{ type: "rect", position: { scale: 1, x: 20, y: 20, r: 50, width: 20, height: 50 }, fill: "green" }
	]
};

React.renderComponent(<ImageEditor initialImage={initialImage}/>, document.getElementById("wrap"));