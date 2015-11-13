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
        template:_.template(Template),
        initialize: function() {

        },
        render: function() {
            $(this.el).html(this.template());
            return this;
        }
    });
    return TemplateView;
});

