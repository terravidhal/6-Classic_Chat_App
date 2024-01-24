const express = require("express");
const cors = require('cors')    /* This is new */
const app = express();
const port = 8000;
app.use(cors())                 /* This is new */
const socket = require('socket.io');  /* This is new */




const server = app.listen( port, () => console.log(`Listening on port: ${port}`) );


const io = socket(server, {
  cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
      allowedHeaders: ['*'],
      credentials: true,
  }
});



io.on("connection", socket => { 
  //console.log('socket id: ' + socket.id);
  
  socket.on("join_room", (data) => {
    socket.join(data); 
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    // socket.emit("receive_message_from_server", data); 

    socket.to(data.room).emit("receive_message_from_server", data); 
    //console.log(data); 
  });


  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});







    