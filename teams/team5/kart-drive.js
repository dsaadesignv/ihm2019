var five = require("johnny-five");
var board = new five.Board({});
var controller = process.argv[2] || "GP2Y0A41SK0F";

const {Button} = require("johnny-five");

var udp = require('dgram');
var client = udp.createSocket('udp4');
/*
  var board = new five.Board({
    port: "/dev/tty.usbserial-14340"
  });
*/


var leftpotentiometer;
var rightpotentiometer;
var irinterrupter;
var tilt;
var soundsensor;
var button;
;
var seuil_sound = 550;

var isCounting = false;
var nbClaps = 0;

board.on("ready", function() {

  leftpotentiometer = new five.Sensor({
    pin: "A3",
    freq: 50
  });

  rightpotentiometer = new five.Sensor({
    pin: "A4",
    freq: 50
  });

  rightpotentiometer.on("data", function() {
    console.log(this.value);

    // On stocke la valeur du potentiomètre (entre 0 et 1023)
    var rightpotentiometerValue = this.value;

    // On définit la logique d'interprétation des données

    // Entre 0   et 300   : on tourne à gauche
    // Entre 300 et 700   : on accélère
    // Entre 700 et 1023  : on tourne à droite

    if (rightpotentiometerValue >= 550 ) {
      client.send("R_RIGHT", 6006, 'localhost', function(error){});

      console.log('On tourne plus à DROITE !');
    }

    else if (rightpotentiometerValue < 550) {

      // On "relâche" gauche et droite au cas où ils soient enclenchés
      client.send("P_RIGHT", 6006, 'localhost', function(error){});

      console.log('On tourne à DROITE !');
    }
    });

    leftpotentiometer.on("data", function() {
      console.log(this.value);

    // On stocke la valeur du potentiomètre (entre 0 et 1023)
    var leftpotentiometerValue = this.value;

    // On définit la logique d'interprétation des données

    // Entre 0   et 300   : on tourne à gauche
    // Entre 300 et 700   : on accélère
    // Entre 700 et 1023  : on tourne à droite

    if (leftpotentiometerValue >= 450) {
      client.send("R_LEFT", 6006, 'localhost', function(error){});

      console.log('On tourne plus à GAUCHE !');
    }

    else if (leftpotentiometerValue < 450) {

      // On "relâche" gauche et droite au cas où ils soient enclenchés
      client.send("P_LEFT", 6006, 'localhost', function(error){});
      console.log('On tourne à GAUCHE !');
    }

    });



    var proximity = new five.Proximity({
      controller: controller,
      pin: "A2"
      });

      proximity.on("data", function() {
      console.log("cm: ", this.cm);

      var irinterrupterValue = this.cm;

      if (irinterrupterValue > 0 && irinterrupterValue <= 15) {
        client.send("P_BRAKE", 6006, 'localhost', function(error){});

        console.log('On recule Michel');
      }

      else if (irinterrupterValue > 15) {
        client.send("R_BRAKE", 6006, 'localhost', function(error){});

        console.log('On recule plus michel !');
      }

    });

    const tilt = new Button(6); // digital pin 2

    board.repl.inject({
      button: tilt
    });

    tilt.on("down", function() {
      client.send("FIRE", 6006, 'localhost', function(error){});
       console.log("FEU !!!");
    });

    tilt.on("up", function() {
      client.send("FIRE", 6006, 'localhost', function(error){});
       console.log("FEU !!!");
     });


       var light = new five.Sensor({
         pin: "A1",
         freq: 50
       });


    light.on("change", function(value) {
      console.log('Light sensor: '+value);


      // On stocke la valeur du potentiomètre (entre 0 et 1023)
      var lightValue = this.value;

      // On définit la logique d'interprétation des données

      // Entre 0   et 300   : on tourne à gauche
      // Entre 300 et 700   : on accélère
      // Entre 700 et 1023  : on tourne à droite

      if (lightValue >= 1000) {
       client.send("P_ACCELERATE", 6006, 'localhost', function(error){});

       console.log('On accelère !');
      }

      else if (lightValue < 1000) {
       client.send("R_ACCELERATE", 6006, 'localhost', function(error){});

       console.log('On accelère plus !');
      }
      });

  button = new five.Button(2);

      board.repl.inject({
        button: button
      });

      // Button Event API

      // "down" the button is pressed
      button.on("down", function() {
        client.send("P_SKIDDING", 6006, 'localhost', function(error){});
        console.log("dérapage");
      });



      // "up" the button is released
      button.on("up", function() {
        client.send("R_SKIDDING", 6006, 'localhost', function(error){});
        console.log("rien");
      });


        var light = new five.Sensor({
          pin: "A5",
          freq: 50
        });


        light.on("change", function(value) {
          console.log('Light sensor: '+value);


              // On stocke la valeur du potentiomètre (entre 0 et 1023)
              var lightValue = this.value;

              // On définit la logique d'interprétation des données

              // Entre 0   et 300   : on tourne à gauche
              // Entre 300 et 700   : on accélère
              // Entre 700 et 1023  : on tourne à droite

              if (lightValue >= 1000) {
                client.send("NITRO", 6006, 'localhost', function(error){});

                console.log('CAVAVIIIIIIITE');

              }
        });


});
