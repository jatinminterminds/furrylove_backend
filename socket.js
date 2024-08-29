module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('a user connected!');
        socket.on('send-message', (data) => {
            console.log(`Received message: ${data}`);
            io.emit('receive-message', JSON.parse(data).message);
        });
        socket.on('newLike', (data) => {
            io.emit('send-notification', data);
        });
    });
}