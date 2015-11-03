angular.module('starter.controllers')

.factory('DataService', function() {
 
 var eventList= null; //all events depending on the selected filter
 var selectedEvent=null; //the selected event, to view details of the event
    
 function setFilteredEventList(parameterEventList) {
   eventList = parameterEventList;
 };
    
 function getFilteredEventList() {
  return eventList;
 };
    
 function setSelectedEvent(parameterEvent){
    event = parameterEvent;
 };
    
 function getSelectedEvent(){
    return event;
 };

 //public interface of the service
 return {
  setFilteredEventList: setFilteredEventList,
  getFilteredEventList: getFilteredEventList,
  setSelectedEvent:setSelectedEvent,
  getSelectedEvent:getSelectedEvent
 };

})

.factory('Utility', function() {
 
    return { 
        /**
        *Checkeck if a variable is empty
        */
        isEmpty:function(value){
            return (value == "" || value == null);
        },
        
        /**
         * Returns a random integer between min (inclusive) and max (inclusive)
         * Using Math.round() will give you a non-uniform distribution!
         */
        getRandomInt: function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    };

});