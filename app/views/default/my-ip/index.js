var Backbone = require("backbone");

var View = Backbone.Marionette.ItemView.extend({
    template: require("./template"),
    tagName: "span"
});

module.exports = View;
