//public/assets/js/views/insurance.view.js
//accessed via the /public/assets/js/views/app.view.js file
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/insurance.template.html'
], function(
    $,_,Backbone,
    Template
){
    var TemplateView = Backbone.View.extend({
        template:_.template('',{}),
        initialize: function(options) {
            this.model = options.model;
        },
        render: function() {
            $(this.el).html(this.template());
            return this;
        }
    });
    return TemplateView;
});

