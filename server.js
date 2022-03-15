import express from 'express';
import socket from 'socket.io';
//setting up App
const app = express();
const server = app.listen(4070,()=>{
console.log('server listening to requests on port 4070')
});

//static files
app.use(express.static('public'));

//socket setup
const io = socket(server);
io.on('connection',(socket)=>{
    console.log('made socket connection', socket.id);

    //Handle chat event
    socket.on('chat',(data)=>{
        io.sockets.emit('chat', data);
    });

    socket.on('typing',(data)=>{
        socket.broadcast.emit('typing',data)
    })
})