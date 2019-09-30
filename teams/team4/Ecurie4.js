var five = require("johnny-five");

var board = new five.Board({
    port: "/dev/tty.usbmodemFA131"
  });

var udp = require('dgram');
var client = udp.createSocket('udp4');

var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);


var direction = "";

app.use(express.static('client'));


board.on("ready", function() {

/*** VARIABLE : poire - nitro */
  var mic = new five.Sensor({
    pin:"A0", freq : 100});
  
/*** VARIABLE : Rouleau de Peinture - lancer objet */

  var touch_front = new five.Button(4);
  var touch_back = new five.Button(8);
 // var touch_side = new five.Button(1); 
/*** VARIABLE : lunette - droite / gauc
  var button_g = new five.Button(7);
   var button_d = new five.Button(3);n
*/        
/*** VARIABLE : 3 éponges - Rescue */
  var help = new five.Button(2);



 /********************************************* POIRE A AIR - NITRO ***/

  mic.on("data", function() {
    
    var micValue = this.value;

    if (micValue > 700) {
       client.send("NITRO", 6006, 'localhost', function(error){});
      
      console.log('NITROOOOO !');
    }
   
  });


 /********************************************* ROULEAU PEINTURE - LANCER OBJET ***/

  touch_front.on("press", function() {
    client.send("FIRE", 6006, 'localhost', function(error){});
    console.log('LAANCEEEEEEER');
  });

  touch_back.on("down", function() {
    client.send("P_LOOKBACK", 6006, 'localhost', function(error){});
    client.send("FIRE", 6006, 'localhost', function(error){});
    client.send("P_LOOKBACK", 6006, 'localhost', function(error){}); // deux fois car sinon trop rapide
    client.send("R_LOOKBACK", 6006, 'localhost', function(error){});
    client.send("R_LOOKBACK", 6006, 'localhost', function(error){});
    console.log('LAANCEEEEEEER en Arrière');
  });

/* touch_side.on("press", function() {

} /*


/********************************************* 3 éponges - RESCUE ***/

  help.on("down", function() {
    client.send("RESCUE", 6006, 'localhost', function(error){});
    console.log("HELP !");
  }); 


/********************************************* LUNETTES - DROITE / GAUCHE ***/

/*
button_g.on("press", function() {
    client.send("P_LEFT", 6006, 'localhost', function(error){});
    console.log('GAUCHE');
  });

 button_g.on("release", function() {
    client.send("R_LEFT", 6006, 'localhost', function(error){});
    console.log('STOP G');
  });


  button_d.on("press", function() {
    client.send("P_RIGHT", 6006, 'localhost', function(error){});
    console.log('DROITE');
  });

  button_d.on("release", function() {
     client.send("R_RIGHT", 6006, 'localhost', function(error){});
    console.log('STOP D');
  });

*/
});




app.get('/', function(req, res){
  res.sendFile(__dirname + '/client/index.html');
});

io.on('connection', function(socket){
  console.log('>>> Téléphone connecté !');
  
  socket.on('mobile/rotation', function(data){


    var newDirection = "";

    if (data.rgamma > 200) {

      newDirection = "avancer";
    }

    else if (data.rgamma < -200) {

      newDirection = "reculer";

    } 

    else {

      newDirection = "stop";
    }



      if (direction != newDirection) {
        if (newDirection == "avancer") {
          console.log('Vroum');
          client.send("R_BRAKE", 6006, 'localhost', function(error){});
          client.send("P_ACCELERATE", 6006, 'localhost', function(error){});
        }

        if (newDirection == "stop") {
          client.send("R_ACCELERATE", 6006, 'localhost', function(error){});
          client.send("R_BRAKE", 6006, 'localhost', function(error){});
          console.log('Rien');
        }

        if (newDirection == "reculer") {
          console.log('Reculer');
          client.send("P_BRAKE", 6006, 'localhost', function(error){});
          client.send("R_ACCELERATE", 6006, 'localhost', function(error){});
        }

        direction = newDirection;

      }
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

