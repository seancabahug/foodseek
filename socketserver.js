const socketio = require('socket.io');
const jwt = require('jsonwebtoken');

module.exports.listen = app => {
    const io = socketio.listen(app);
    var authenticatedClients = [];

    io.on('connection', socket => {
        io.on('authenticate', token => {
            try {
                const payload = jwt.verify(token, process.env.JWT_SECRET);
                if (!authenticatedClients[payload.accountId]) { // No authenticated user exists yet, good to go
                    socket.userData = payload;
                    socket.authenticated = true;
                    authenticatedClients[socket.userData.accountId] = socket;
                } else {
                    // An authenticated user does exist, killing connection
                    socket.emit('serverError', {
                        cause: 'auth',
                        details: 'There is an existing connection established with your account.'
                    }); // Authentication error
                    socket.disconnect();
                }
            } catch (err) {
                socket.emit('serverError', {
                    cause: 'auth',
                    details: 'Failed to authenticate.'
                }); // Authentication error
                socket.disconnect();
            }
        });

        io.on('message', data => {
            if (socket.authenticated) {
                if (authenticatedClients[data.recipientId]) {
                    authenticatedClients[data.recipientId].emit('message', {
                        senderId: socket.userData.accountId,
                        senderName: socket.userData.realName,
                        message: data
                    });
                } else {
                    socket.emit('serverError', {
                        cause: 'sentmsg',
                        details: "The user you're trying to talk to is offline."
                    });
                }
            } else {
                socket.emit('serverError', {
                    cause: 'auth',
                    details: 'You are not authenticated.'
                }); // Authentication error
                socket.disconnect();
            }
        });

        io.on('disconnect', () => {
            if (socket.authenticated) {
                delete authenticatedClients[socket.userData.accountId];
            }
        });
    });

    return io;
}