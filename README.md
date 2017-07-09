# React.Routes.Renderer

A Promise interface for rendering isomorphic React components in Node.

An example implementation can be found in `v1` of [React.Router.Pagination.IO](http://github.com/sequencemedia/React.Router.Pagination.IO.git).

A companion package, `redux-routes-renderer`, is for React Redux applications.

## Example

In your web server:
```
const { Renderer } = require('react-routes-renderer')

const renderer = new Renderer()
```

In your web server's request handler:

```
const routes = require('./path/to/routes')
const path = '/request/path'

renderer.render(routes, path)
  .then((o) => {
    /*
     *  Your success response
     */
  .catch((e) => {
    /*
     *  Your failure response
     */
  })
```

If React Router can match the request path to a route definition and it is rendered, then your server's success response handler will receive an object which looks like:

```
{ rendered: /* String */ }
```

The `rendered` string will be whatever is returned from `ReactDOMServer.renderToString()`.

If React Router matches the request path to a redirect definition, then your success response handler will receive an object which looks like:

```
{ redirect: /* Object */ }
```

The `redirect` object will be whatever `location` is returned from `match()`.

If `match()` encounters an error, or `ReactDOMServer.renderToString()` encounters an error, then your error response handler will receive an error object; this is a `500 Internal Server Error`.

If `match()` cannot match the request path to a route definition, then your error response handler will receive a different error; this is a `404 Not Found`.
