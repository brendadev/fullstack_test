//public/assets/js/collections/insurance.data.collections.js
//access via the /public/assets/js/views/app.view.js
define([
    'underscore',
    'backbone',
    'models/insurance.data.model'
], function(_, Backbone, InsuranceDataModel){
    var DataCollection = Backbone.Collection.extend({
        model:InsuranceDataModel,
        url: function() {
            return '/data/insurance';
        },
        initialize: function() {

        },
        parse:function(response) {
            return response.data;
        }
    });
    return DataCollection;
});
