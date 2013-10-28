var Backbone = require("backbone"),
    View = require("./my-ip");

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