var five = require("johnny-five"),
  board, fsr;

var udp = require('dgram');
var client = udp.createSocket('udp4');

board = new five.Board();

board.on("ready", function() {

  fsr = new five.Sensor({
    pin: "A0" // ,
    // freq: 25
  });


  fsr.on("data", function() {
    console.log(this.value);
    
    // On stocke la valeur du potentiomètre (entre 0 et 1023)
    var fsrValue = this.value;

    if (fsrValue >= 25) {
      console.log("A DROITE");
      client.send("P_RIGHT", 6006, 'localhost', function(error){});

    } else {
      client.send("R_RIGHT", 6006, 'localhost', function(error){});
            console.log("RELEASE RIGHT");
    }

    }); 

});


