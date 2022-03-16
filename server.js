import express from 'express';
import socket from 'socket.io';
import dotenv from 'dotenv'
dotenv.config()
//setting up App
const app = express();
const port = process.env.PORT || 4070;
const server = app.listen(port,()=>{
console.log(`server listening to requests on port ${port}`)
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