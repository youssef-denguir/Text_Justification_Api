import express from "express";
import compression from "compression";
import errorHandler from "errorhandler";
import { AuthController } from "./controllers/auth";

export class App {
    private readonly _app: express.Application; 

    constructor() {
        this._app = express();
    }

    init(): express.Application {
        this._app.set("port", process.env.PORT || 3000);
        this.initMiddlewares();
        this.initRoutes();
        return this._app;
    }

    initMiddlewares(): void {
        if (process.env.NODE_ENV === "development") {
            this._app.use(errorHandler());
        }

        this._app.use(compression());
        this._app.use(express.json());
    }

    initRoutes(): void {
        this._app.use("/api/v1/auth", new AuthController().getRouter());
        // this._app.use("/api/v1/text-processing", textProcessingRouter);
    }
}
