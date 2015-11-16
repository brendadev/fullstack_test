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
            this.graphType = options.graphTypeOption;
        },
        render: function() {
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
            if(this.graphType == "line"){
                $(this.el).highcharts({
                    chart: {
                        width:1200
                    },
                    credits: {
                        enabled: false
                    },
                    title: {
                        text: 'Private Health Insurance Levels By State',
                        x: -20 //center
                    },
                    xAxis: {
                        // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                        //categories: xlabels,
                        categories: this.dataPoints.map(function(obj) { return obj.xlabel; }),
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
                        data: this.dataPoints.map(function(obj) { return obj.statePop; }),
                        type: 'spline'
                    }, {
                        name: 'Insured',
                        data: this.dataPoints.map(function(obj) { return obj.stateIns; }),
                        type: 'spline'
                    }, {
                        name: 'Uninsured',
                        data: this.dataPoints.map(function(obj) { return obj.stateUnins; }),
                        type: 'spline'
                    }]
                });
            }
            else if (this.graphType == "bar"){
                $(this.el).highcharts({
                    chart: {
                        type: 'column',
                        height: 700,
                        //backgroundColor:'rgba(0, 0, 0, 0)',
                        width:1200
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
            }
        }
    });
    return TemplateView;
});

