import bodyParser from 'body-parser';
import errorHandler from 'errorhandler';
import express from 'express';
import Router from 'express-promise-router';
import helmet from 'helmet';
import * as http from 'http';
import cors from 'cors';
import { registerRoutes } from './routes';
import { envs } from '../../config/envs.plugin';
import { buildLogger } from '../../Contexts/shared/plugins';
import { apiErrorHandler } from './routes/shared';

const corsOptions = {
  origin: envs.ALLOWED_ORIGINS?.split(',') ?? [],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
};

const logger = buildLogger('pecera-server');

export class Server {
  private express: express.Express;
  private port: number;
  private host: string;
  private httpServer?: http.Server;

  constructor(host: string, port: number) {
    this.port = port;
    this.host = host;
    this.express = express();
    this.express.use(cors(corsOptions));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(helmet.xssFilter());
    this.express.use(helmet.noSniff());
    this.express.use(helmet.hidePoweredBy());
    this.express.use(helmet.frameguard({ action: 'deny' }));
    const router = Router();
    router.use(errorHandler());
    this.express.use(router);

    registerRoutes(router);

    router.use(apiErrorHandler);
  }

  async listen(): Promise<void> {
    return new Promise((resolve) => {
      const env: string = this.express.get('env');
      this.httpServer = this.express.listen(this.port, () => {
        const host = ['local', 'test'].includes(env)
          ? `${this.host}:${this.port}`
          : this.host;
        const message: string = `Backend App is running at ${host} in ${env} mode`;
        logger.info(message);
        resolve();
      });
    });
  }

  getHTTPServer() {
    return this.httpServer;
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close((error) => {
          if (error) {
            const message: string =
              error?.message || 'Error stopping the server';
            reject(new Error(message));
            return;
          }
          resolve();
        });
      } else {
        resolve();
      }
    });
  }
}
