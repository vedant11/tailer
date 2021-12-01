const reader = require('readline');
const fs = require('fs');
const { Stream } = require('stream');

const linesSpeaker = (fileLocation, starting) => {
	return new Promise((resolve, reject) => {
		const linesReader = reader.createInterface({
			input: fs.createReadStream(fileLocation, {
				start: starting,
			}),
			output: new Stream(),
		});
		let extraLogLines = [];
		linesReader.on('SIGTSTP', (err) => {
			reject(err);
		});
		linesReader.on('line', (line) => {
			extraLogLines.push(line.trim());
		});
		linesReader.on('close', () => {
			if (extraLogLines.length > 10)
				resolve(extraLogLines.slice(-10).join('\n'));
			resolve(extraLogLines.join('\n'));
		});
	});
};

const attachFileReader = (LOG_FILE, io) => {
	let resolver;
	const createFile = new Promise((resolve, reject) => {
		resolver = resolve;
	});
	fs.open(LOG_FILE, 'a+', (err, content) => {
		// a+ append flag avoid old data deletion
		resolver();
	});
	Promise.all([createFile]).then(() => {
		console.log('file-check resolved');

		fs.watchFile(LOG_FILE, (curr, prev) => {
			if (curr.mtime === prev.mtime) return 0;
			console.log('New content detected!');
			linesSpeaker(
				LOG_FILE,
				prev.size < curr.size ? prev.size : curr.size
			)
				.then((lines) => io.emit('lines-update', lines))
				.catch((err) => {
					console.error(err);
					io.emit('error', err);
				});
			return 0;
		});
	});
};

module.exports = { linesSpeaker, attachFileReader };
