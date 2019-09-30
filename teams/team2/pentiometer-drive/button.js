var five = require("johnny-five"),
  board, button;

var udp = require('dgram');
var client = udp.createSocket('udp4');

board = new five.Board();

board.on("ready", function() {

  // Create a new `button` hardware instance.
  // This example allows the button module to
  // create a completely default instance

 /* button1 = new five.Button({
    pin:"A2",
  });

  // Button Event API

  // "down" the button is pressed
  button1.on("down", function() {
    console.log("down");
    client.send("P_RIGHT", 6006, 'localhost', function(error){});
  });

  // "hold" the button is pressed for specified time.
  //        defaults to 500ms (1/2 second)
  //        set
  button1.on("hold", function() {
    console.log("hold");
    client.send("P_RIGHT", 6006, 'localhost', function(error){});
  });

  // "up" the button is released
  button1.on("up", function() {
    console.log("up");
    client.send("R_LEFT", 6006, 'localhost', function(error){});
    client.send("R_RIGHT", 6006, 'localhost', function(error){});
      
    // Puis on accélère tout droit
    client.send("P_ACCELERATE", 6006, 'localhost', function(error){});
  });

button2 = new five.Button({
    pin:"A3",
  });

    button2.on("down", function() {
    console.log("down");
    client.send("P_LEFT", 6006, 'localhost', function(error){});
  });

  // "hold" the button is pressed for specified time.
  //        defaults to 500ms (1/2 second)
  //        set
  button2.on("hold", function() {
    console.log("hold");
    client.send("P_LEFT", 6006, 'localhost', function(error){});
  });

  // "up" the button is released
  button2.on("up", function() {
    console.log("up");
    client.send("R_LEFT", 6006, 'localhost', function(error){});
    client.send("R_RIGHT", 6006, 'localhost', function(error){});
      
    // Puis on accélère tout droit
    client.send("P_ACCELERATE", 6006, 'localhost', function(error){});
  });*/

  button3 = new five.Button({
    pin:"5",
  });

    button3.on("down", function() {
    console.log("down");
  });

  button3.on("hold", function() {
    console.log("hold");
  });

  // "up" the button is released
  button3.on("up", function() {
    console.log("up");
    client.send("RESCUE", 6006, 'localhost', function(error){});
  });

});


