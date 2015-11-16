//public/assets/js/views/app.view.js
//referenced by /public/router.js
define([
    'jquery',
    'underscore',
    'backbone',
    'collections/insurance.data.collection',
    'models/insurance.data.model',
    'views/insurance.line.graph.view'
], function(
        $,_,Backbone,InsuranceDataCollection,InsuranceDataModel,InsuranceLineGraphView
    ){
    var AppView = Backbone.View.extend({
        el: $('#myApp'),
        initialize: function () {
            //instantiating collection, so all views have access to this
            this.insuranceData = new InsuranceDataCollection();
            this.insuranceData.bind('sync',this.procData,this);
            this.insuranceData.fetch({cache:false});
        },
        procData:function(){
            //console.log(this);
            //calculate insurance/uninsured values
            this.insuranceData.each(function(model){
                model.set({'percentUninsured': (model.attributes.number_uninsured/model.attributes.population)*100});
                model.set({'percentInsured': (model.attributes.number_insured/model.attributes.population)*100});
            },this);
            //call views and pass collection of insurance data
            var lineGraphView = new InsuranceLineGraphView({collection: this.insuranceData});
            this.$('.main').append(lineGraphView.render().el);
            var columnGraphView = new InsuranceLineGraphView({collection: this.insuranceData});
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
