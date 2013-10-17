var Backbone = require("backbone"),
    Layout = require("views/default");

module.exports = Backbone.Marionette.Controller.extend({
    initialize: function (options) {
        this.region = options.region;
    },

    showDefault: function () {
        this.region.show(new Layout());
    }
});