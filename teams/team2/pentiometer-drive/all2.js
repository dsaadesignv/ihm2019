var five = require("johnny-five"),
  board, right_button, left_button, lookback;

const {Board, Proximity} = require("johnny-five");

var udp = require('dgram');
var client = udp.createSocket('udp4');

board = new five.Board();

var derapageState = "";

//var proximity;
var potentiometer1;
//var potentiometer2;

var potentiometer1direction;
//var potentiometer2objet

board.on("ready", function() {

//LOOKBACK

  lookback = new five.Sensor({
    pin: "A0",
    freq: 50

  });

  lookback.on("data", function() {

  var lookbackValue = this.value;
  //console.log(this.value);
    if (lookbackValue <= 5) {
      console.log("photo-résistance : ", this.value);
      console.log("DERRIERE");
      client.send("P_LOOKBACK", 6006, 'localhost', function(error){});

    } else {
      client.send("R_LOOKBACK", 6006, 'localhost', function(error){});
            // console.log("RELEASE DERRIERE");
    }


  });

//RESCUE

  rescue_button = new five.Button({ 
    pin:"A3"
  });

  rescue_button.on("up", function() {
    console.log("rescue");
    client.send("RESCUE", 6006, 'localhost', function(error){});
  });

 // LEFT RIGHT 

  //gauche 
  left_button = new five.Button({
    pin:"4"
  });

    left_button.on("down", function() {
    console.log("gauche");
    client.send("P_LEFT", 6006, 'localhost', function(error){});
  });

  left_button.on("up", function() {
    client.send("R_LEFT", 6006, 'localhost', function(error){});
    
  });

   //droite
  right_button = new five.Button({
    pin:"7"
  });

    right_button.on("down", function() {
    console.log("droite");
    client.send("P_RIGHT", 6006, 'localhost', function(error){});
  });

  right_button.on("up", function() {
    client.send("R_RIGHT", 6006, 'localhost', function(error){});
    
  });

//AVANT ARRIERE

  potentiometer1 = new five.Sensor({
    pin: "A5" 
  });

  potentiometer1.on("data", function() {
    //console.log(this.value);
    
    var potentiometer1Value = this.value;

    var potentiometer1direction_new = "";
    
    if (potentiometer1Value <= 300) {
      potentiometer1direction_new = "avancer";
    }
    
    else if (potentiometer1Value > 300 && potentiometer1Value <= 500) {
      potentiometer1direction_new = "neutre";
    }
    
    else if (potentiometer1Value > 500) {
      potentiometer1direction_new = "reculer";
    }


    //console.log(potentiometer1direction, potentiometer1direction_new);

    
    if (potentiometer1direction_new != potentiometer1direction) {
      if (potentiometer1direction_new == "avancer") {
        client.send("R_BRAKE", 6006, 'localhost', function(error){});
        client.send("P_ACCELERATE", 6006, 'localhost', function(error){});
        console.log('AVANT');
      }


      if (potentiometer1direction_new == "neutre") {
        console.log('NEUTRE');

        client.send("R_ACCELERATE", 6006, 'localhost', function(error){});
        client.send("R_BRAKE", 6006, 'localhost', function(error){});
      }


      if (potentiometer1direction_new == "reculer") {
        client.send("R_ACCELERATE", 6006, 'localhost', function(error){});
        client.send("P_BRAKE", 6006, 'localhost', function(error){});
        
        console.log('ARRIERE');
      }
    }



    potentiometer1direction = potentiometer1direction_new;

  });

 /*//DERAPER

  deraper = new five.Sensor({
    pin: "A2",
    freq: 50

  });

  deraper.on("data", function() {
 console.log(this.value);
  var deraperValue = this.value;

    var derapageStateNow = "";

    if (deraperValue >=5 ) {
      derapageStateNow = "P_SKIDDING";

    } else {
      derapageStateNow = "R_SKIDDING";
    }

  if (derapageState != derapageStateNow) {

    if (derapageState == "P_SKIDDING" ) {
      client.send("P_SKIDDING", 6006, 'localhost', function(error){});
    } else {
      client.send("R_SKIDDING", 6006, 'localhost', function(error){});
    }
  }

  derapageState = derapageStateNow;



  });
//NITRO

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

// FIRE

  potentiometer2 = new five.Sensor({
    pin: "A3" 
  });

  potentiometer2.on("data", function() {
    //console.log(this.value);
    
    var potentiometer2Value = this.value;
    var potentiometer2objet_new = "";
    
   if (potentiometer2Value > 700) {   
    potentiometer2objet_new = "objet";
   }


  if (potentiometer2objet_new != potentiometer2objet){
        if (potentiometer2objet_new == "objet"){
          client.send("FIRE", 6006, 'localhost', function(error){});
          console.log('fire');
        }
    }

    potentiometer2objet = potentiometer2objet_new;

  });
*/

// BRACKETS DE FIN !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
});