require('babel-register')({ ignore: /node_modules\/(?!(react-routes-renderer)).*/ })
module.exports = require('./lib')
