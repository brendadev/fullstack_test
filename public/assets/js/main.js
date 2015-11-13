//public/main.js
//accessed via the insurance.jade template
require.config({
    paths: {
        jquery          : 'libs/jquery/jquery',
        underscore      : 'libs/underscore/underscore',
        backbone        : 'libs/backbone/backbone',
        highchart       : 'libs/highchart/highcharts',
        templates       : '../templates'
    }

});

require([
    'client'
], function(App){

    window.App = App;
    window.App.initialize();
});

window.debug = true;
