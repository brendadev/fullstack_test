//public/assets/models/insurance.model.js
//accessed via the /public/assets/js/views/app.view.js
define([
    'underscore',
    'backbone'
], function(_, Backbone){
    var accountSettingsModel = Backbone.Model.extend({
        urlRoot:function(){
            var base = '/insurance';
            return base;
        },
        initialize: function() {

        },
        parse:function(response) {
            if (response.status == 200) {
                return response.data;
            } else {
                return response;
            }
        }
    });
    return accountSettingsModel;
});