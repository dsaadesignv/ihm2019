/*
  
  01. Light sensor
  
  Brancher le jumper sur la sortie A0 de la carte Arduino
  
*/

var five = require("johnny-five");
var board = new five.Board({});

/*
  var board = new five.Board({
    port: "/dev/tty.usbserial-14340"
  });
*/


board.on("ready", function() {
  
  var light = new five.Sensor("A0");

  light.on("change", function(value) {
    console.log('Light sensor: '+value);
  });

});