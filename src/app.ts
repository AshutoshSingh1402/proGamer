import express, { Application } from 'express';
import connectMongoDB from './databases/mongodb'
import router from './routes/index.route';
import passportJwtStrategy from './config/passport-jwt-strategy';
// @ts-ignore
import { ParseServer } from 'parse-server';
import morgan from 'morgan';
import logger from './config/logger';

class App {
  public app: Application;
  public port: number;
  public parseServer: ParseServer;

  constructor() {
    this.app = express();
    this.port = 3000;

    this.addLogger();
    this.connectDatabase();
    this.initializeMiddlewares();
    this.initializeParse()
    this.initializeRoutes();
  }

  listen(): void {
    this.app.listen(this.port, () => console.log(`Server started on port ${this.port}`));
  }

  private async connectDatabase(): Promise<void> {
    await connectMongoDB();
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(): void {
    this.app.use('/api', router);
    // this.app.use('/parse', this.parseServer);
  }

  private initializeParse() {
   this.parseServer = new ParseServer({
      databaseURI: '',
      appId: '',
      masterKey: '',
      serverURL: '',
    });
  }

  private addLogger() {
    // this.app.use(morgan('combined', { stream: logger.stream }));
  }
}

export default App;
