// require http, routing modules
const http = require('http');
const routes = require('patterns')();
const st = require('st');

// serve static files in current working directory
const staticDir = st({ path: `${__dirname}/dist`, url: '/dist' });

// index route
routes.add('GET /', (req, res) => {
	res.setHeader('Content-Type', 'text/html');
	res.end('<h1>HackPlate</h1>');
});

// create server
const server = http.createServer((req, res) => {
	// match routes
	const match = routes.match(`${req.method} ${req.url}`);
	const staticMount = staticDir(req, res);

	// static file
	if (staticMount) {
		return;
	// if match found call function
	} else if (match) {
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
