/* const {Board, Proximity} = require("johnny-five");
const board = new Board();

var udp = require('dgram');
var client = udp.createSocket('udp4');
var proximity;

board.on("ready", () => {
  const proximity = new Proximity({
    controller: "HCSR04",
    pin: 7
  });

  proximity.on("change", () => {
    console.log("Proximity: ");
    console.log("  cm  : ", proximity.cm);
    console.log("  in  : ", proximity.in);
    console.log("-----------------");
  });
  
proximity.on("data", function() {
    console.log(this.value);
    
    // On stocke la valeur du potentiomètre (entre 0 et 1023)
    var proximityValue = this.value;
    
    // On définit la logique d'interprétation des données
    
    // Entre 0   et 300   : on tourne à gauche
    // Entre 300 et 700   : on accélère
    // Entre 700 et 1023  : on tourne à droite
    
    if (proximityValue <= 45) {
      client.send("NITRO", 6006, 'localhost', function(error){});
      
      console.log('NITRO !');
    };
  


});
});
*/ 
const {Board, Proximity} = require("johnny-five");
const board = new Board();
  
var udp = require('dgram');
var client = udp.createSocket('udp4');



var proximity;



board.on("ready", function() {

  proximity = new Proximity({
    controller: "HCSR04",
    pin: "7"
  });

  proximity.on("change", () => {
    console.log("Proximity: ");
    console.log("  cm  : ", proximity.cm);
    console.log("  in  : ", proximity.in);
    console.log("-----------------");

  if (proximity.cm <= 55) {
      client.send("NITRO", 6006, 'localhost', function(error){});
      
      console.log('NITRO !');
    };


  });
  
});


