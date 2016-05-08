# React.Routes.Renderer

A Promise interface for rendering isomorphic React components at the server. You can instantiate this class in ES5+ without transpiling or refactoring your application.

```
var Renderer = require('react-routes-renderer').Renderer,
	renderer = new Renderer(),
	routes = require('./path/to/routes').routes;

/*
Then in your web server's request handler:
*/
var path = '/request/path';
renderer.render(routes, path)
	.then(function (o) {
		/*
			Your success response
		*/
	.catch(function (e) {
		/*
			Your error response
		*/
	});
```
