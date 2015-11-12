define([
    'jquery',
    'underscore',
    'backbone',
    'models/insurance.data.model',
    'views/app.view',
    'views/insurance.data.view'
], function(
    $, _, Backbone,InsuranceDataModel,AppView,InsuranceDataView
){
    var AppRouter = Backbone.Router.extend({
        routes: {
            '*action': 'defaultAction'
        }
    });

    window.instance = '';
    if(window.self != window.top) {
        try {
            window.utils.output('router', 'load in iframe');
        }
        catch (e) {
            console.log('Error: ' + e);
        }
    } else {
        var paths = window.location.pathname.split('/');
        if(paths.length > 2) {
            switch(paths[1]){
                default:
                     var appView = new InsuranceDataView;
                    appView.render();
            }
        }
    }

    var initialize = function(){
        var app_router = new AppRouter;
        app_router.on('route:defaultAction',function(actions){
        });
        Backbone.history.start();
    };
    return{
        initialize: initialize
    };
});