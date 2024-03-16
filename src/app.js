import express from 'express';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';
import routes from './routes';

class App {
  constructor() {
    this.server = express();

    mongoose.connect('mongodb+srv://devhouse:devhouse@devhouse.iz3qmq5.mongodb.net/?retryWrites=true&w=majority&appName=devhouse');

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'uploads')),
    );

    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
