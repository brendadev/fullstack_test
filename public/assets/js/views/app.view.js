//public/assets/js/views/app.view.js
//access via the /public/router.js
define([
    'jquery',
    'underscore',
    'backbone',
    'models/insurance.model',
    'views/insurance.view'
], function(
        $,_,Backbone,InsuranceModel,InsuranceView
    ){
    var AppView = Backbone.View.extend({
        el: $('#myApp'),
        initialize: function () {
            this.insurance = new InsuranceModel();
            this.insurance.bind('sync',this.procData,this);
            this.insurance.fetch();
        },
        render: function () {
            return this;
        },
        procData:function(){
            var insuranceView = new InsuranceView();
            this.$('main').append(insuranceView.render().el);
        }
    });
    return AppView;
});
