import io from 'socket.io-client';
import Cookies from 'universal-cookie';
import APIUtil from '../utils/apiutil';

const cookies = new Cookies();

export default () => {
    const socket = io();
    socket.on('connect', () => {
        socket.emit('authenticate', cookies.get('token'));
    })
    const registerErrorHandlers = ({ onSendMessageError, onAuthError, onUnknownError }) => {
        socket.on('serverError', data => {
            switch(data.cause) {
                case 'auth': onAuthError(data.details); break;
                case 'sentmsg': onSendMessageError(data.details); break;
                default: onUnknownError(data.cause); break;
            }
        })
    }
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