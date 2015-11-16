define([
    'jquery',
    'underscore',
    'backbone',
    'highchart'
], function(
    $,_,Backbone,
    Highchart
){
    var TemplateView = Backbone.View.extend({
        className:'container',
        initialize: function(options) {
            this.insuranceCollectionData = options.collection;
        },
        render: function() {
            //$(this.el).html(this.template());
            this.processData();
            return this;
        },
        processData: function(){
            //create array with insurance data by state
            var dataPoints = [];
            this.insuranceCollectionData.each(function(model){
                dataPoints.push({
                    xlabel: model.get('name'),
                    statePop: model.get('population'),
                    stateIns: model.get('number_insured'),
                    stateUnins: model.get('number_uninsured')
                });
            },this);
            //console.log(dataPoints);
            //debugger;

            //sort data
            dataPoints.sort(function(a,b){
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
            this.dataPoints = dataPoints;
            //console.log(dataPoints);
            //plot data
            this.plotData();
            return this;
        },
        plotData:function(){
            //$(this.el).html(this.template());
            //console.log(this.dataPoints);
            //debugger;
            // HIGHCHARTS MAP
            //use . instead of #, why?
            //$('#container').highcharts({
            //STACKED PLOT
            /*
             chart: {
             height: this.chartHeight,
             width:this.chartWidth,
             marginTop: 10,
             marginLeft: 80,
             marginRight: 0,
             reflow: false,
             backgroundColor:'rgba(255, 255, 255, 0.1)',
             style: {
             fontFamily: 'Open Sans'
             }
             },
             */
            $(this.el).highcharts({
                chart: {
                    type: 'column',
                    height: 700,
                    //backgroundColor:'rgba(0, 0, 0, 0)',
                    width:1000
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: 'Private Health Insurance Levels By State'
                },
                xAxis: {
                    categories: this.dataPoints.map(function(obj) { return obj.xlabel; }),
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
                    data: this.dataPoints.map(function(obj) { return obj.stateIns; })
                }, {
                    name: 'Uninsured',
                    data: this.dataPoints.map(function(obj) { return obj.stateUnins; })
                }]
            });
            //debugger;
        }
    });
    return TemplateView;
});

