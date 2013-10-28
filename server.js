"use strict";

var http = require("http"),
    httpProxy = require("http-proxy"),
    connect = require("connect");

exports.startServer = function (port, path, callback) {
    var proxy = new httpProxy.RoutingProxy();

    var app = connect()
        .use(connect.favicon())
        .use(connect.logger("dev"))
        .use(connect.static(path))

        // For demonstration purposes only. Route all incoming http requests starting on path "/json"
        // to freegeoip.net. See the the default/index view on see how this route is called.

        .use("/json", function (req, res) {
            req.url = req.originalUrl;

            proxy.proxyRequest(req, res, {
                host: "freegeoip.net",
                port: "80"
            });
        });

    http.createServer(app).listen(port, callback);
};
