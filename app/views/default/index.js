var Backbone = require("backbone"),
    View = require("./my-ip");

// For demonstration purposes only.
// This simple model defines the URL path to a RESTFul endpoint made
// available on freegeoip.net, which returns geolocation information
// related to a given IP. See "server.js" for details on how this
// route is handled.

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