import { connect } from 'mongoose';
import { ENV } from '../config/env';
import logger from '../config/logger';

const connectMongoDB = async () => {
  try {
    const mongoURI: string = ENV.MONGODB_URI;
    await connect(mongoURI);
    logger.info(`MongoDB connection started`);
  } catch (err) {
    console.error(err);
    logger.error(`MongoDB connection error: ${err}`);
    process.exit(1);
  }
};

export default connectMongoDB;
