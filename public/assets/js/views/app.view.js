//public/assets/js/views/app.view.js
//access via the /public/router.js
define([
    'jquery',
    'underscore',
    'backbone'//,
    //'models/profile.model',
    //'views/side.menu.view'
], function(
        $,_,Backbone
    ){
    var AppView = Backbone.View.extend({
        el: $('#myApp'),
        initialize: function () {
            
        },
        render: function () {
            return this;
        },
    });
    return AppView;
});
