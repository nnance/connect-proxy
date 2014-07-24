var http = require('http'),
    httpProxy = require('http-proxy');

//
// Create a proxy server with custom application logic
//
var proxy = httpProxy.createProxyServer({target: 'http://localhost:8080'});

var connect = require('connect');
var serveStatic = require('serve-static');

connect()
.use(function(req,res,next){
  if (req.url.indexOf('server') === 1) {
    console.log('proxying request');
    //
    // rewrite the URL path
    //
    req.url = '/';
    proxy.web(req, res);
  } else {
    //
    // if no conditional match try next middleware
    //
    next();
  }
})
.use(serveStatic(__dirname + '/proxy'))
.listen(5000);
