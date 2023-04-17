import { DB_NAME, MONGO_CONNECTION_URI } from "../config";
import { ConnectOptions } from "mongoose";

export const dbConnection: { url: string, options: ConnectOptions } = {
  url: MONGO_CONNECTION_URI,
  options: {
    dbName: DB_NAME,
  }
};