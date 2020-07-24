const socketio = require('socket.io');
const jwt = require('jsonwebtoken');

module.exports = io => {
    var authenticatedClients = [];

    io.on('connection', socket => {
        console.log("conn");
        socket.on('authenticate', token => {
            console.log("auth :pog:");
            try {
                const payload = jwt.verify(token, process.env.JWT_SECRET);
                if (!authenticatedClients[payload.accountId]) { // No authenticated user exists yet, good to go
                    socket.userData = payload;
                    socket.authenticated = true;
                    authenticatedClients[socket.userData.accountId] = socket;
                    console.log("authed");
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

        socket.on('message', data => {
            console.log("got msg")
            if (socket.authenticated) {
                if (authenticatedClients[data.recipientId]) {
                    const messageData = {
                        senderId: socket.userData.accountId,
                        senderName: socket.userData.realName,
                        message: data
                    };
                    authenticatedClients[data.recipientId].emit('message', messageData);
                    socket.emit('message', messageData);
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

        socket.on('disconnect', () => {
            if (socket.authenticated) {
                delete authenticatedClients[socket.userData.accountId];
            }
        });
    });
}