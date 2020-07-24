import io from 'socket.io-client';
import Cookies from 'universal-cookie';
import APIUtil from '../utils/apiutil';

const cookies = new Cookies();

export default class Socket {
    constructor() {
        this.socket = io.connect();
        this.socket.on('connect', () => {
            this.socket.emit('authenticate', cookies.get('token'));
            console.log("connect")
        });
        this.socket.on('error', err => {
            console.error("socket.io error: " + err);
        });
    }
    registerErrorHandlers({ onSendMessageError, onAuthError, onUnknownError }) {
        this.socket.on('serverError', data => {
            switch(data.cause) {
                case 'auth': onAuthError(data.details); break;
                case 'sentmsg': onSendMessageError(data.details); break;
                default: onUnknownError(data.cause); break;
            }
        })
    }
    registerMessageHandler(callback) {
        this.socket.on('message', data => {
            console.log(data)
            callback(data);
        })
    }
    sendMessage(message, recipientId) {
        console.log("sending msg")
        this.socket.emit('message', {
            recipientId: recipientId, 
            message: message
        });
    }
}