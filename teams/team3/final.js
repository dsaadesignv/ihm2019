
var five = require("johnny-five");
var board = new five.Board({})
var udp = require('dgram');
var client = udp.createSocket('udp4');

var lightsensorAVANT;
var lightsensorDROITE;
var lightsensorGAUCHE;
var volumeRESCUE;
var nitroTimer;
var distanceCadeau;

var isCounting = false;
var nbClaps = 0;

const seuil_av = 15;
const seuil_droite = 17;
const seuil_gauche = 7;
const seuil_volume = 730;
const seuil_cadeau = 35;




board.on("ready", function() {
 

  	// CAPTEUR LUMIERE ACCELERER

  lightsensorAVANT = new five.Sensor("A0");

  lightsensorAVANT.on("change", function(value) {
    //console.log('Light sensor A0 : '+this.value);

       // On stocke la valeur du capteur de lumiere (entre 0 et 1023)
      var lightsensorAVANTValue = this.value;

      // On définit la logique d'interprétation des données
      // Au dessus de 900 : on accélère
    if (lightsensorAVANTValue <= seuil_av) {
          client.send("P_ACCELERATE", 6006, 'localhost', function(error){});
          console.log('On ACCÉLÈRE !');
        }

    else if (lightsensorAVANTValue > seuil_av) {
          client.send("R_ACCELERATE", 6006, 'localhost', function(error){});
          console.log('On RELACHE L ACCELERATEUR');
        }    
  });

 

    // CAPTEUR LUMIERE DROITE

  lightsensorDROITE = new five.Sensor("A1");

  lightsensorDROITE.on("change", function(value) {


     // On stocke la valeur du capteur de lumiere (entre 0 et 1023)
    var lightsensorDROITEValue = this.value;

    // On définit la logique d'interprétation des données
    // Au dessus de 900 : on tourne à droite

    if (lightsensorDROITEValue <= seuil_droite) {
      client.send("P_RIGHT", 6006, 'localhost', function(error){});
      console.log('On tourne à DROITE !');
    }
    
    else if (lightsensorDROITEValue > seuil_droite) {
      
      // On "relâche" gauche et droite au cas où ils soient enclenchés
      client.send("R_RIGHT", 6006, 'localhost', function(error){});
      console.log('On RELACHE LE GUIDON');
    }

  });




      // CAPTEUR LUMIERE GAUCHE

  lightsensorGAUCHE = new five.Sensor("A2");

  lightsensorGAUCHE.on("change", function(value) {
    //console.log('Light sensor A2 : '+this.value);


     // On stocke la valeur du capteur de lumiere (entre 0 et 1023)
    var lightsensorGAUCHEValue = this.value;

    // On définit la logique d'interprétation des données
    // Au dessus de 300 : on tourne à droite

    if (lightsensorGAUCHEValue <= seuil_gauche) {
      client.send("P_LEFT", 6006, 'localhost', function(error){});    
      console.log('On tourne à GAUCHE !');
    }
    
    else if (lightsensorGAUCHEValue > seuil_gauche) {
    
    // On "relâche" gauche et droite au cas où ils soient enclenchés
      client.send("R_LEFT", 6006, 'localhost', function(error){});
      console.log('On RELACHE LE GUIDON 2');
    }
  });

    




// MICRO RESCUE

  var mic = new five.Sensor("A3");

  mic.on("data", function() {


    var volumeRESCUEValue = this.value
    // On définit la logique d'interprétation des données

    if (volumeRESCUEValue >= seuil_volume) {

      if (isCounting == false) {
        isCounting = true;
        // Premier clap, on va commencer à compter
        nbClaps = 1;

        setTimeout(function(){
          nbClaps = 0;
          isCounting = false;
        }, 1000);
      } else {
        nbClaps += 1;

        if (nbClaps >= 3) {
          client.send("RESCUE", 6006, 'localhost', function(error){});
          console.log('PIOU PIOU LE PIAF');
        }               
      console.log("mic          " + nbClaps);
      }
    }
});






// ------ BOUTON DERAPAGE --------

  // Create a new `button` hardware instance.
  // This example allows the button module to
  // create a completely default instance
  button = new five.Button(2);

  // Inject the `button` hardware into
  // the Repl instance's context;
  // allows direct command line access
  board.repl.inject({
    button: button
  });

  // Button Event API

  // "down" the button is pressed
  button.on("down", function() {
        console.log('BUTTON 1 down');
    client.send("P_SKIDDING", 6006, 'localhost', function(error){});

  });


  // "up" the button is released
  button.on("up", function() {
    // clearInterval(derapageTimer);

        client.send("R_SKIDDING", 6006, 'localhost', function(error){});

  });



  // ------ REGARDER EN ARRIERE --------

  buttonLOOKBACK = new five.Button(4);


  // "down" the button is pressed
  buttonLOOKBACK.on("down", function() {
        console.log('BUTTON 2 down');
    client.send("P_LOOKBACK", 6006, 'localhost', function(error){});

  });


  // "up" the button is released
  buttonLOOKBACK.on("up", function() {
    // clearInterval(derapageTimer);
    client.send("R_LOOKBACK", 6006, 'localhost', function(error){});
  });


/*

  // ------ FREINS --------

  button3 = new five.Button(6);


  // Button Event API

  // "down" the button is pressed
  button3.on("down", function() {
    client.send("P_BRAKE", 6006, 'localhost', function(error){});

  });


  // "up" the button is released
  button3.on("up", function() {
    // clearInterval(derapageTimer);

        client.send("R_BRAKE", 6006, 'localhost', function(error){});
  });


*/


  // ------ NITRO --------

  button4 = new five.Button(8);


  // "down" the button is pressed
  button4.on("down", function() {
    client.send("NITRO", 6006, 'localhost', function(error){});
    console.log("ça roule vite");

    nitroTimer = setInterval(function(){
      client.send("NITRO", 6006, 'localhost', function(error){});
    }, 250);
  });

  // "hold" the button is pressed for specified time.
  //        defaults to 500ms (1/2 second)
  //        set
  // button.on("hold", function() {
  //   client.send("NITRO", 6006, 'localhost', function(error){});
  // });

  // "up" the button is released
  button4.on("up", function() {
    clearInterval(nitroTimer);
  });



// ------ LANCER DE CADEAUX --------


  var proximity = new five.Proximity({
    controller: "HCSR04",
    pin: "A5"
  });


    proximity.on("data", function() {


         // On stocke la valeur du capteur de lumiere (entre 0 et 1023)
        var distanceCadeauValue = this.cm;

        // On définit la logique d'interprétation des données
          
        // Au dessus de 300 : on tourne à droite

        if (distanceCadeauValue <= seuil_cadeau || distanceCadeauValue>40) {
          client.send("FIRE", 6006, 'localhost', function(error){});
          
          console.log('LANCER DE CADEAUX !');
        }

    });






});














