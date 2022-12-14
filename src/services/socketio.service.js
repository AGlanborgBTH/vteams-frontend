import { io } from 'socket.io-client';

class SocketioService {
  socket;
  constructor() {}

  setupSocketConnection() {
    this.socket = io(process.env.VUE_APP_SOCKET_ENDPOINT);
    this.socket.emit('my message', 'Hello there from Vue.');
  }

  disconnect() {
    if (this.socket) {
        this.socket.disconnect();
    }
  }

  getScooters() {
    this.socket.on('sendAllScooters', (data) => {
      console.log(data);
    });
  }
}

export default new SocketioService();