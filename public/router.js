//public/router.ja
//needed by /public/client.js
define([
    'jquery',
    'underscore',
    'backbone',
    //'models/session.model',
    'views/app.view'
], function(
    $, _, Backbone,AppView
){
    var AppRouter = Backbone.Router.extend({
        routes: {
            '*actions': 'defaultAction'
        }
    });
    var AppView = new AppView();
    appView.render();

    var initialize = function(){

        var app_router = new AppRouter;
        app_router.on('route:defaultAction', function(actions){
        });

        Backbone.history.start();
    };
    return {
        initialize: initialize
    };
});