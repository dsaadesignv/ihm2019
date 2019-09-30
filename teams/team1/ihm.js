var five = require("johnny-five");
const {Accelerometer} = require("johnny-five");
var board = new five.Board();
var button_right, button_left, 
touch, photoresistor_nitro, photoresistor_accelerate;
var timer = 100; // Intervalle de mesure de l'accélération en ms
var calibre_acceleration = 2; // Calibre accélération pour FIRE

var udp = require('dgram');
var client = udp.createSocket('udp4');


board.on("ready", function() {


// VITESSE

  photoresistor_nitro = new five.Sensor({
    pin: "A1",
    freq: 250
  });

  photoresistor_accelerate = new five.Sensor({
    pin: "A3",
    freq: 250
  });

  photoresistor_nitro.on("data", function() {

    //console.log('nitro :', this.value);

    if (this.value >= 1000)
    {
      console.log('NITRO');
      client.send("NITRO", 6006, 'localhost', function(error){});
    }
    else {
      //console.log('nitro :', this.value, 'test');
      //client.send("R_BRAKE", 6006, 'localhost', function(error){});
    }
  });

  photoresistor_accelerate.on("data", function() {

    //console.log('accélerer :', this.value);

    if (this.value >= 1000)
    {
      client.send("P_ACCELERATE", 6006, 'localhost', function(error){});
      console.log('Accélerer');
    }
    else {
      client.send("R_ACCELERATE", 6006, 'localhost', function(error){});
      //console.log('arrêter daccélérer');
    }
  });






// TURN RIGHT
  button_right = new five.Button({pin:2,invert: true}); // Pin D2, courant inversé pour pinces à linge

  button_right.on("down", function() {
    client.send("P_RIGHT", 6006, 'localhost', function(error){});
    console.log("DROITE-");
  });

  button_right.on("hold", function() {
    client.send("P_RIGHT", 6006, 'localhost', function(error){});
    console.log("DROITE");
  });

  button_right.on("up", function() {
    client.send("R_RIGHT", 6006, 'localhost', function(error){});
    console.log("TOUT DROIT");
  });


// TURN LEFT
  button_left = new five.Button({pin:4,invert: true}); // Pin D2, courant inversé pour pinces à linge

  button_left.on("down", function() {
    client.send("P_LEFT", 6006, 'localhost', function(error){});
    console.log("GAUCHE-");
  });

  button_left.on("hold", function() {
    client.send("P_LEFT", 6006, 'localhost', function(error){});
    console.log("GAUCHE");
  });

  button_left.on("up", function() {
    client.send("R_LEFT", 6006, 'localhost', function(error){});
    console.log("TOUT DROIT");
  });



// FIRE
  const accelerometer = new Accelerometer({controller: "ADXL345"}); // Branchement sur I2C

  setInterval(function () { // Timer selon valeur de x en variable
    var d = new Date();

    //console.log('fire :', accelerometer.acceleration);

    if (accelerometer.acceleration >= calibre_acceleration){
      client.send("FIRE", 6006, 'localhost', function(error){});
      console.log('FIRE');
    }

    else{
      //console.log("lol");
    }
  }, timer);




// RESCUE
  var touch = new five.Button(8);

  touch.on("press", function() {
    client.send("RESCUE", 6006, 'localhost', function(error){});
    console.log('RESCUE');
  });

  touch.on("release", function() {
    //console.log('xxx');
  });


  // SKIDDING
  button_skidding = new five.Button({pin:6,invert: true}); // Pin D5, courant inversé pour pinces à linge

  button_skidding.on("down", function() {
    client.send("P_SKIDDING", 6006, 'localhost', function(error){});
    console.log('DERAPAGE-');
  });

  button_skidding.on("hold", function() {
    client.send("P_SKIDDING", 6006, 'localhost', function(error){});
    console.log('DERAPAGE');
  });

  button_skidding.on("up", function() {
    client.send("R_SKIDDING", 6006, 'localhost', function(error){});
    //console.log('stop dérapage');
  });



}); // fermer function board








