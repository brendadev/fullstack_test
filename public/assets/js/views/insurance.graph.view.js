define([
    'jquery',
    'underscore',
    'backbone',
    'highchart',
    'text!templates/insurance.graph.template.html'
], function(
    $,_,Backbone,
    Highchart,Template
){
    var TemplateView = Backbone.View.extend({
        template:_.template(Template),
        initialize: function() {

        },
        render: function() {
            $(this.el).html(this.template());
            this.processData(this.insuranceDataCollection);
            return this;
        },
        processData: function(){
            //create array with insurance data by state
            var dataPoints = [];
            this.collection.each(function(model){
                dataPoints.push({
                    xlabel: model.get('name'),
                    statePop: model.get('population'),
                    stateIns: model.get('number_insured'),
                    stateUnins: model.get('number_uninsured')
                });
            },this);
            console.log(dataPoints);
            //debugger;
            //plot data
            this.plotData();
            return this;
        },
        plotData:function(){
            debugger;
        }
    });
    return TemplateView;
});

