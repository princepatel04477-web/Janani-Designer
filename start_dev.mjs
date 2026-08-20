import { createServer } from 'vite';

async function start() {
  try {
    const server = await createServer({
      configFile: './vite.config.ts',
      server: {
        port: 5173,
        host: '0.0.0.0'
      }
    });
    await server.listen();
    server.printUrls();
    console.log('Vite server running!');
  } catch (err) {
    console.error('Error starting Vite dev server:', err);
    process.exit(1);
  }
}

start();
