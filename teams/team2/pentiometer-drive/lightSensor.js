// var udp = require('dgram');
// var client = udp.createSocket('udp4');
// var five = require("johnny-five"),
//   board, photoresistor;

// board = new five.Board();

// board.on("ready", function() {

//   // Create a new `photoresistor` hardware instance.
//   photoresistor = new five.Sensor({
//     pin: "A0",
//     freq: 25

//   });

//   // Inject the `sensor` hardware into
//   // the Repl instance's context;
//   // allows direct command line access
//   board.repl.inject({
//     pot: photoresistor
//   });

//   // "data" get the current reading from the photoresistor
//   photoresistor.on("change", function() {
//     console.log(this.value);

//   var photoresistorValue = this.value;

//     if (photoresistorValue >= 1000) {
//       console.log("DERRIERE");
//       client.send("P_LOOKBACK", 6006, 'localhost', function(error){});

//     } else {
//       client.send("R_LOOKBACK", 6006, 'localhost', function(error){});
//             console.log("RELEASE DERRIERE");
//     }


//   });
// });
var five = require("johnny-five"),
  board, photoresistor;

board = new five.Board();

board.on("ready", function() {

  // Create a new `photoresistor` hardware instance.
  photoresistor = new five.Sensor({
    pin: "A0",
    freq: 50
  });

  // Inject the `sensor` hardware into
  // the Repl instance's context;
  // allows direct command line access
  board.repl.inject({
    pot: photoresistor
  });

  // "data" get the current reading from the photoresistor
  photoresistor.on("data", function() {
    console.log(this.value);
  });
});
