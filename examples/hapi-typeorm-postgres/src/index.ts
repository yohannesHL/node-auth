import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { Server } from '@hapi/hapi';
import registerServices from './services';

const startServer = async (): void => {
  let dbConn;
  try {
    dbConn = await createConnection();
    console.warn(`DB connection "${dbConn.name}" started`);
  } catch (err) {
    console.error('Error setting up DB', err);
  }

  const server = new Server({ port: process.env.SERVER_PORT, app: { dbConn } });

  await registerServices(server);

  await server.start();

  console.warn(`Server running at ${server.info.uri}`);

  process.on('SIGINT', async () => {
    try {
      await server.stop();
    } catch (err) {
      process.exit(err ? 1 : 0);
    }
  });

  process.on('SIGTERM', (): void => process.exit(1));
  process.on('unhandledRejection', (reason): void => {
    console.warn('CLOSED DUE TO UNEXPECTED ERROR', reason);
    process.exit(1);
  });
};

startServer();
