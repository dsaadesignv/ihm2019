var five = require("johnny-five");
var board = new five.Board({port:"/dev/tty.usbserial-14140"});
  
var udp = require('dgram');
var client = udp.createSocket('udp4');


var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);


app.use(express.static('client'));

var potentiometer;



board.on("ready", function() {

  potentiometer = new five.Sensor({
    pin: "A3",
    freq: 50
  });

  potentiometer.on("data", function() {
    // On stocke la valeur du potentiomètre (entre 0 et 1023)
    var potentiometerValue = this.value;
    
    console.log("Potentiomètre : "+potentiometerValue);
    
    /*
    
    // On définit la logique d'interprétation des données
    
    // Entre 0   et 300   : on tourne à gauche
    // Entre 300 et 700   : on accélère
    // Entre 700 et 1023  : on tourne à droite
    
    if (potentiometerValue <= 300) {
      client.send("P_RIGHT", 6006, 'localhost', function(error){});
      
      console.log('On tourne à DROITE !');
    }
    
    else if (potentiometerValue > 300 && potentiometerValue <= 700) {
      
      // On "relâche" gauche et droite au cas où ils soient enclenchés
      client.send("R_LEFT", 6006, 'localhost', function(error){});
      client.send("R_RIGHT", 6006, 'localhost', function(error){});
      
      // Puis on accélère tout droit
      client.send("P_ACCELERATE", 6006, 'localhost', function(error){});
      
      console.log('On ACCÉLÈRE !');
    }
    
    else if (potentiometerValue > 700) {
      client.send("P_LEFT", 6006, 'localhost', function(error){});
      
      console.log('On tourne à GAUCHE !');
    }
    */
  });
});



app.get('/', function(req, res){
  res.sendFile(__dirname + '/client/index.html');
});

io.on('connection', function(socket){
  console.log('>>> Téléphone connecté !');
  
  socket.on('mobile/orientation', function(data){
    console.log('Données reçues :');
    console.log(data);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});