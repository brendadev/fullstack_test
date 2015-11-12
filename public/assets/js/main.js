require.config({
    paths: {
        backbone        : 'libs/backbone/backbone',
        highchart       : 'libs/highchart/highcharts',
        jquery          : 'libs/jquery/jquery',
        moment          : 'libs/moment/moment',
        underscore      : 'libs/underscore/underscore',
        templates       : '../templates'
    }
});

require([
    'client'
], function(App){
    window.App = App;
    window.App.initialize();
});