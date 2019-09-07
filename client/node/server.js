var udp = require('dgram');
var buffer = require('buffer');

var client = udp.createSocket('udp4');

setInterval(function(){
//sending msg
client.send("P_ACCELERATE", 6006, 'localhost',function(error){
  if(error){
    client.close();
  }else{
    console.log('Data sent !!!');
  }
});

},2000);


/*
var data1 = Buffer.from('hello');
var data2 = Buffer.from('world');


//sending multiple msg
client.send([data1,data2],2222,'localhost',function(error){
  if(error){
    client.close();
  }else{
    console.log('Data sent !!!');
  }
});
*/