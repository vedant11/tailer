// modules
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { path } = require('path');

// new instances
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

// socket engine
io.on('connection', (socket) => {
	console.log('User connected ', socket.id);
	// send the last 10 lines of the file
});
io.engine.on('connection_error', (err) => {
	console.log('err with user ', err.context, err.messsage);
});

// express server
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, './index.html'));
});

// server porting
httpServer.listen(5000, 'localhost', () => {
	console.log('the app has started working successfully');
});
