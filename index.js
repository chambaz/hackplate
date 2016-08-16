// require http, routing modules
const http = require('http');
const routes = require('patterns')();

// index route
routes.add('GET /', (req, res) => {
	res.setHeader('Content-Type', 'text/html');
	res.end('<h1>HackPlate</h1>');
});

// create server
const server = http.createServer((req, res) => {
	// match routes
	const match = routes.match(`${req.method} ${req.url}`);

	// if match found call function
	if (match) {
		const fn = match.value;
		req.params = match.params;
		fn(req, res);
	} else {
		res.end('404');
	}
});

// listen for http request on port 9000
server.listen(9000, () => {
	console.log('🤘 Server is running on http://localhost:9000 🤘');
});
