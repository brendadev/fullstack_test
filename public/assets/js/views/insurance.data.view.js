define([
    'jquery',
    'backbone',
    'collections/insurance.data.collection',
    'models/insurance.data.model',
    'text!templates/insurance.graphs.template.html'
], function($,Backbone,insuranceDataCollection,insuranceDataModel,Template) {

    var insuranceDataView = Backbone.View.extend({
        template:_.template(Template),
        initialize:function() {
            var _this = this;

            this.hdata = new insuranceDataCollection();
            this.hdata.bind('sync',this.procData,this);
            this.hdata.fetch({
                success: function() {
                    _this.render();
                }
            });
        },
        procData:function() {
            //console.log(this);
            //each method provided by underscore.js
            this.hdata.each(function(insuranceDataModel){
                //console.log((insuranceDataModel.attributes.number_uninsured/insuranceDataModel.attributes.population)*100);
                insuranceDataModel.set({'percentUninsured': (insuranceDataModel.attributes.number_uninsured/insuranceDataModel.attributes.population)*100});
                insuranceDataModel.set({'percentInsured': (insuranceDataModel.attributes.number_insured/insuranceDataModel.attributes.population)*100});
            },this);
        },
        render: function(){
            $(this.el).html(this.template());
            // Create array from collection's name attributes
            //var xlabels = new Array();
            var plotData = [];
            // Create array from collection's population attributes
            //var statePopulation = new Array();
            // Create array from collection's number insured attributes
            //var stateInsured = new Array();
            // Create array from collection's number uninsured attributes
            //var stateUninsured = new Array();

            this.hdata.each(function(insuranceDataModel){
                //xlabels.push(insuranceDataModel.get('name'));
                plotData.push({
                    xlabel: insuranceDataModel.get('name'),
                    statePop: insuranceDataModel.get('population'),
                    stateIns: insuranceDataModel.get('number_insured'),
                    stateUnins: insuranceDataModel.get('number_uninsured')
                });
                //statePopulation.push(insuranceDataModel.get('population'));
                //stateInsured.push(insuranceDataModel.get('number_insured'))
                //stateUninsured.push(insuranceDataModel.get('number_uninsured'))
            },this);

            //console.log(plotData);
            plotData.sort(function(a,b){
                //console.log(a);
                //console.log(a.statePop);
                //console.log(typeof(a.population));
                if(a.statePop < b.statePop){
                    return 1;
                }
                if(a.statePop > b.statePop){
                    return -1;
                }
                return 0;
            });
            //console.log(plotData);

            // HIGHCHARTS MAP
            $('#container1').highcharts({
                title: {
                    text: 'Private Health Insurance Levels By State',
                    x: -20 //center
                },
                xAxis: {
                    // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                    //categories: xlabels,
                    categories: plotData.map(function(obj) { return obj.xlabel; }),
                    //type: 'category',
                    //crop: false,
                    //overflow: 'none',
                    //tickInterval: 1,

                    // to rotate xlabels
                    labels: {
                        rotation: 320
                    }
                },
                yAxis: {
                    title: {
                        text: 'Population (Millions)'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },
                series: [{
                    name: 'Population',
                    data: plotData.map(function(obj) { return obj.statePop; }),
                    type: 'spline'
                }, {
                    name: 'Insured',
                    data: plotData.map(function(obj) { return obj.stateIns; }),
                    type: 'spline'
                }, {
                    name: 'Uninsured',
                    data: plotData.map(function(obj) { return obj.stateUnins; }),
                    type: 'spline'
                }]
            });
            //debugger;
            //STACKED PLOT
            $('#container2').highcharts({
                chart: {
                    type: 'column',
                    height: 700
                },
                title: {
                    text: 'Private Health Insurance Levels By State'
                },
                xAxis: {
                    categories: plotData.map(function(obj) { return obj.xlabel; }),
                    labels: {
                        rotation: 320
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Population (Millions)'
                    },
                    stackLabels: {
                        style: {
                            fontWeight: 'bold',
                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                        }
                    }
                },
                legend: {
                    align: 'right',
                    x: -30,
                    verticalAlign: 'top',
                    y: 25,
                    floating: true,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                    borderColor: '#CCC',
                    borderWidth: 1,
                    shadow: false
                },
                tooltip: {
                    headerFormat: '<b>{point.x}</b><br/>',
                    pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
                },
                plotOptions: {
                    column: {
                        stacking: 'normal',
                        dataLabels: {
                            enabled: false,
                            color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                            style: {
                                textShadow: '0 0 3px black'
                            }
                        }
                    }
                },
                series: [{
                    name: 'Insured',
                    data: plotData.map(function(obj) { return obj.stateIns; })
                }, {
                    name: 'Uninsured',
                    data: plotData.map(function(obj) { return obj.stateUnins; })
                }]
            });
        }
    });
    return insuranceDataView;
});
