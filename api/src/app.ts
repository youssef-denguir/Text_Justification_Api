import express from "express";
import compression from "compression";
import { AuthenticationController, TextJustificationController } from "./controllers";

export class App {
    private readonly _app: express.Application; 

    constructor() {
        this._app = express();
    }

    init(): express.Application {
        this.initMiddlewares();
        this.initRoutes();
        return this._app;
    }

    initMiddlewares(): void {
        this._app.use(compression());
        this._app.use(express.json());
    }

    initRoutes(): void {
        this._app.use("/api", new TextJustificationController().getRouter());
        this._app.use("/api/auth", new AuthenticationController().getRouter());
    }
}
