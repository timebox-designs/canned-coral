# Canned Coral

![Canned Coral](app/assets/img/browser-window-2.png)

> Great Taste in a Can

## Features
A reverse proxy, implemented using [http-proxy](https://npmjs.org/package/http-proxy) and [connect](https://npmjs.org/package/connect),
that enables you to route incoming http requests to different backend services. See "server.js" for details.

### Languages
* [JavaScript](http://www.codecademy.com/tracks/javascript)
* [Stylus](http://learnboost.github.io/stylus/)

### Frameworks
* [Backbone](http://backbonejs.org/) v1.0.x
* [Bootstrap](http://getbootstrap.com/) v3.0.x
* [Font Awesome](http://fortawesome.github.io/Font-Awesome/) v4.0.x
* [Handlebars](http://handlebarsjs.com/) v1.0.x
* [jQuery](http://jquery.com/) v1.10.x
* [Marionette](http://marionettejs.com/) v1.1.x
* [Swag] (http://elving.github.com/swag/) v0.3.x
* [Underscore](http://documentcloud.github.io/underscore/) v1.5.x

### Plugins
* [JavaScript-brunch](https://github.com/brunch/javascript-brunch)
* [CSS-brunch](https://github.com/brunch/css-brunch)
* [Stylus-brunch](https://github.com/brunch/stylus-brunch)
* [Handlebars-brunch](https://github.com/brunch/handlebars-brunch)
* [Uglify-JS-brunch](https://github.com/brunch/uglify-js-brunch)
* [Clean-CSS-brunch](https://github.com/brunch/clean-css-brunch)
* [JSHint-brunch](https://github.com/brunch/jshint-brunch)

## Getting started
Requires [Brunch](http://brunch.io/) 1.7.x

    $ brunch new git://github.com/timebox-designs/canned-coral.git [optional-output-dir]
    $ cd [optional-output-dir]
    $ brunch w -s

or

    $ git clone git://github.com/timebox-designs/canned-coral.git
    $ npm install
    $ brunch w -s

## Bits and Pieces

### server.js
Connect can filter requests based on routes. Specify the path you want to proxy in the use statement,
then define the host and port of the service you are proxying. Stand back and let http-proxy do the rest.

``` js
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

        // For demonstration purposes only.
        // Route all incoming http requests starting on path "/json" to
        // freegeoip.net.

        .use("/json", function (req, res) {
            req.url = req.originalUrl;

            proxy.proxyRequest(req, res, {
                host: "freegeoip.net",
                port: "80"
            });
        });

    http.createServer(app).listen(port, callback);
};
```

### views/default/index.js
Define the URL path as you normally would and let the reverse proxy handle the details.

``` js
var Backbone = require("backbone"),
    View = require("./my-ip");

// For demonstration purposes only.
// This simple model defines the URL path to a RESTFul endpoint made
// available on freegeoip.net, which returns geolocation information
// related to a given IP.

var Model = Backbone.Model.extend({
    url: "/json"
});

var Layout = Backbone.Marionette.Layout.extend({
    template: require("./template"),

    regions: {
        ip: "#my-ip"
    },

    onShow: function () {
        var self = this, model = new Model();

        model.fetch()
            .done(function () {
                self.ip.show(new View({model: model}));
            });
    }
});

module.exports = Layout;
```

## License
The MIT License (MIT)

Copyright (c) 2013 timebox-designs

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

