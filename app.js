const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { path } = require('path');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

io.on('connection', (socket) => {
	console.log('User connected ', socket.id);
});

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, './index.html'));
});

httpServer.listen(5000, 'localhost', () => {
	console.log('the app has started working successfully');
});
