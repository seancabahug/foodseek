import io from 'socket.io-client';
import Cookies from 'universal-cookie';
import APIUtil from '../utils/apiutil';

const cookies = new Cookies();

export default () => {
    const socket = io();

    socket.on('connect', () => {
        socket.emit('authenticate', cookies.get('token'));
    })

    socket.on('aerror', data => {
        alert("Authentication error. Please try logging in again.");
        APIUtil.logout();
    })

    const onMessageReceived = callback => {
        socket.on('message', callback);
    }

    const sendMessage = (message, recipientId) => {
        socket.emit('message', {
            recipientId: recipientId, 
            message: message
        });
    }

    socket.on('error', err => {
        console.error("socket.io error: " + err);
    });
}