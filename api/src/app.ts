import express from "express";
import compression from "compression";
import * as apiController from "./controllers/api";


// Create Express server
const app = express();


// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(express.json());

app.get("/api", apiController.getIndex);

export default app;
