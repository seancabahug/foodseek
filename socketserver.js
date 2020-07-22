const socketio = require('socket.io');

module.exports.listen = app => {
    const io = socketio.listen(app);
    var authenticatedClients = [];

    io.on('connection', socket => {
        io.on('authenticate', token => {
            
        })
    });

    return io;
}