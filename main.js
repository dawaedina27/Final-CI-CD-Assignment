const app = require('./app');

const PORT = 4000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

server.on('error', (err) => {
  console.error('Server error:', err);
});

server.on('close', () => {
  console.error('Server closed unexpectedly.');
});

process.on('exit', (code) => {
  console.log(`Process exiting with code ${code}`);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err);
  process.exit(1);
});
