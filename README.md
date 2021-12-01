# tailer
basic webapp for the POSIX tail command

- `app.js` is an express instance; Socket.io supports only HTTPServer instance, hence the express is wrapped around HTTPServer
- `reader.js` emits a custom event `line-update` on file update
- `index.html` appends the lines on the screen on update event

express, socket.io, readline, fs
