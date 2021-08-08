import express from 'express';
import expressLoader from './express.loader';

export default async ({ app }: { app: express.Application }) => {
  try {
    await expressLoader({ app });
  } catch (error) {
    throw new Error('[LOADER ERROR] : ' + error);
  }
};
