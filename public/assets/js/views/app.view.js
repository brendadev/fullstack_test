//public/assets/js/views/app.view.js
//referenced by /public/router.js
define([
    'jquery',
    'underscore',
    'backbone',
    'collections/insurance.data.collection',
    'models/insurance.data.model',
    'views/insurance.line.graph.view',
    'views/insurance.bar.graph.view',
    'views/insurance.graph.view'
], function(
        $,_,Backbone,InsuranceDataCollection,InsuranceDataModel,
        InsuranceLineGraphView,InsuranceBarGraphView,InsuranceGraphView
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
            //var graphView = new InsuranceLineGraphView({collection: this.insuranceData});
            //this.$('.main').append(graphView.render().el);
            //graphView = new InsuranceBarGraphView({collection: this.insuranceData});
            //this.$('.main').append(graphView.render().el);
            var newGraphView = new InsuranceGraphView({collection: this.insuranceData,graphTypeOption: "line"});
            this.$('.main').append(newGraphView.render().el);
            newGraphView = new InsuranceGraphView({collection: this.insuranceData,graphTypeOption: "bar"});
            this.$('.main').append(newGraphView.render().el);
        },
        render: function () {
            //var insuranceView = new InsuranceView();
            //this.$('main').append(insuranceView.render().el);
            return this;
        }
    });
    return AppView;
});
