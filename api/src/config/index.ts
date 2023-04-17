import { config } from "dotenv";
config({ path: `.env.${process.env.NODE_ENV || "development"}` });

export const { NODE_ENV, PORT, MONGO_CONNECTION_URI, DB_NAME, SECRET_KEY } = process.env;
