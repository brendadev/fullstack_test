//public/assets/js/views/app.view.js
//referenced by /public/router.js
define([
    'jquery',
    'underscore',
    'backbone',
    'collections/insurance.data.collection',
    'models/insurance.data.model',
    'views/insurance.graph.view'
], function(
        $,_,Backbone,InsuranceDataCollection,InsuranceDataModel,InsuranceGraphView
    ){
    var AppView = Backbone.View.extend({
        el: $('#myApp'),
        initialize: function () {
            this.insuranceData = new InsuranceDataCollection();
            this.insuranceData.bind('sync',this.procData,this);
            this.insuranceData.fetch({cache:false});
        },
        procData:function(){
            console.log(this);
            //calculate insurance/uninsured values
            this.insuranceData.each(function(model){
                model.set({'percentUninsured': (model.attributes.number_uninsured/model.attributes.population)*100});
                model.set({'percentInsured': (model.attributes.number_insured/model.attributes.population)*100});
            },this);
            //call views
            var lineGraphView = new InsuranceGraphView();
            this.$('.main').append(lineGraphView.render().el);
            var columnGraphView = new InsuranceGraphView();
            this.$('.main').append(columnGraphView.render().el);
        },
        render: function () {
            //var insuranceView = new InsuranceView();
            //this.$('main').append(insuranceView.render().el);
            return this;
        }
    });
    return AppView;
});
