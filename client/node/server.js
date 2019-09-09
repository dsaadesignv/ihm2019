var five = require("johnny-five");
var board = new five.Board({
  port: "/dev/cu.usbserial-14140"
});

var udp = require('dgram');
var buffer = require('buffer');

var client = udp.createSocket('udp4');
var potentiometer;


board.on("ready", function() {

  /*
  var sensor = new five.Sensor("A3");

  sensor.on("change", function(value) {
    console.log(value);
  });
  */

  
  potentiometer = new five.Sensor({
    pin: "A3",
    freq: 50
  });

  potentiometer.on("data", function() {
    console.log(this.value, this.raw);
  });
  
  
  
  var light = new five.Sensor("A0");

  light.on("change", function(value) {
    console.log('Light sensor: '+value);
  });
  
  
  var button = new five.Button(2);
  
  // "down" the button is pressed
  button.on("down", function() {
    console.log("down");
  });

  // "hold" the button is pressed for specified time.
  //        defaults to 500ms (1/2 second)
  //        set
  button.on("hold", function() {
    console.log("hold");
  });

  // "up" the button is released
  button.on("up", function() {
    console.log("up");
  });
  
});
/*
setInterval(function(){
  
  //sending msg
  client.send("P_ACCELERATE", 6006, 'localhost',function(error){
    if(error){
      client.close();
    }else{
      console.log('Data sent !!!');
    }
  });

},2000);
*/


/*
var data1 = Buffer.from('hello');
var data2 = Buffer.from('world');


//sending multiple msg
client.send([data1,data2],2222,'localhost',function(error){
  if(error){
    client.close();
  }else{
    console.log('Data sent !!!');
  }
});
*/