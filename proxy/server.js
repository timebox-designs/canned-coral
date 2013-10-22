"use strict";
var http = require("http"),
    httpProxy = require("http-proxy"),
    connect = require("connect"),
    config = require("config"),
    path = require("path"),
    _ = require("underscore");

exports.startServer = function (port, publicPath, callback) {

    var proxy = new httpProxy.RoutingProxy();

    var app = connect()
        .use(connect.favicon())
        .use(function (req, res, next) {

            var proxied = _(config.proxy).find(function (value, intercept) {
                return req.url.indexOf(intercept) === 0;
            });

            if (proxied)
                return proxy.proxyRequest(req, res, proxied);

            if (req.url.indexOf(config.baseUrl) === 0)
                req.url = req.url.replace(config.baseUrl, "");

            return next();
        })
        .use(connect.static(path.resolve(publicPath)));

    var server = http.createServer(app);
    server.listen(port, callback);
};