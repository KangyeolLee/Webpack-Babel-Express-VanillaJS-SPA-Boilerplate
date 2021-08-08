import express from 'express';
import config from './config';
import loaders from './loader';

async function startServer() {
  const app = express();

  try {
    await loaders({ app });
    app.listen(config.port, () =>
      console.log(`🛡️  Server listening on port: ${config.port} 🛡️`)
    );
  } catch (error) {
    console.log(error);
  }
}
