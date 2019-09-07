import hypermedia.net.*;

UDP udp;  // define the UDP object

String message_prev = "";

void setup() {
  udp = new UDP( this, 6000 );  // create a new datagram connection on port 6000
  //udp.log( true );         // <-- printout the connection activity
  udp.listen( true );           // and wait for incoming message

  size(300, 300);
}

void draw()
{
  String ip       = "localhost"; // the remote IP address
  int port        = 6006;        // the destination port
  String message  = "P_ACCELERATE";


  background(0, 255, 0);

  if (mouseX < 100) {
    message = "P_LEFT";
    background(255, 0, 0);
  }

  if (mouseX > 200) {
    message = "P_RIGHT";
    background(0, 0, 255);
  }

  if (mouseY > 200) {
    message = "P_BRAKE";
    background(255, 255, 255);
  }

  fill(255);
  ellipseMode(CENTER);
  ellipse(mouseX, mouseY, 5, 5);

  if (message != message_prev) {

    udp.send(message, ip, port );   // the message to send
  }

  message_prev = message;
}

void keyPressed() {
}

void receive( byte[] data ) {          // <-- default handler
  //void receive( byte[] data, String ip, int port ) {   // <-- extended handler

  for (int i=0; i < data.length; i++)
    print(char(data[i]));
  println();
}
