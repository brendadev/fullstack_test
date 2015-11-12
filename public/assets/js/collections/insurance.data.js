define([
   'backbone',
   'models/insurance.data.model'
],function(Backbone, dataModel){
   var InsuranceDataCollection = Backbone.Collection.extend({
      model: dataModel,
      url: function() {
         return '../../data/data.json';
      },
      initialize:function() {

      },
      parse:function(response) {
         //debugger;
         return response.data;
      }
   });
   return InsuranceDataCollection;
});
