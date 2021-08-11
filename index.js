//Handling Socket.io
const http = require("http")

//Enabling cors policyewf
const io = require("socket.io")(8000, {
    cors: {
      origin: "*"
    }
  });



// io.on -> its a http instance...will listen to every incoming events
//socket.on -> Handles what to do with a particular connection
//socket.broadcast.emit -> Broadcast message to all other members except the cliet who's sending it


const users = {};


io.on("connection" , socket => {
    socket.on('new-user-joined' , name => {
        users[socket.id] = name;

        socket.broadcast.emit('user-joined', name);

    });

    
    socket.on("send" , message => {
        socket.broadcast.emit("recieve" , {message: message , name : users[socket.id]})
    });

    socket.on("disconnect", message => {
        socket.broadcast.emit("leave", users[socket.id]);

        setTimeout(() => {
             delete users[socket.id];
        }, 1500);
     
    })
})