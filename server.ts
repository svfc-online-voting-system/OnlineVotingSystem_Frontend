import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';
import https from 'https';
import fs from 'fs';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
	const server = express();
	const serverDistFolder = dirname(fileURLToPath(import.meta.url));
	const browserDistFolder = resolve(serverDistFolder, '../browser');
	const indexHtml = join(serverDistFolder, 'index.server.html');

	const commonEngine = new CommonEngine();

	server.set('view engine', 'html');
	server.set('views', browserDistFolder);

	// Serve static files from /browser
	server.get(
		'**',
		express.static(browserDistFolder, {
			maxAge: '1y',
			index: 'index.html',
		}),
	);

	// All regular routes use the Angular engine
	server.get('**', (req, res, next) => {
		const { protocol, originalUrl, baseUrl, headers } = req;

		commonEngine
			.render({
				bootstrap,
				documentFilePath: indexHtml,
				url: `${protocol}://${headers.host}${originalUrl}`,
				publicPath: browserDistFolder,
				providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
			})
			.then((html) => res.send(html))
			.catch((err) => next(err));
	});

	return server;
}

function run(): void {
	const port = process.env['PORT'] || 4000;

	// SSL certificate configuration
	const certPath = join(process.cwd(), 'certificates');
	let sslOptions;

	try {
		sslOptions = {
			key: fs.readFileSync(join(certPath, 'localhost-key.pem')),
			cert: fs.readFileSync(join(certPath, 'localhost.pem')),
		};
	} catch (error) {
		console.error('Error reading SSL certificates:', error);
		process.exit(1);
	}

	// Start up the Node server with HTTPS
	const server = app();
	https.createServer(sslOptions, server).listen(port, () => {
		console.log(
			`Node Express server listening on https://localhost:${port}`,
		);
	});
}

run();
