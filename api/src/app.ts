import express from "express";
import compression from "compression";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { AuthenticationController, TextJustificationController } from "./controllers";

export class App {
    private readonly _app: express.Application; 

    constructor() {
        this._app = express();
    }

    init(): express.Application {
        this.initMiddlewares();
        this.initRoutes();
        this.initSwagger();
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
    initSwagger(): void {
        const options = {
          swaggerDefinition: {
            info: {
              title: 'Justification API',
              version: '1.0.0',
              description: 'API documentation using Swagger',
            },
          },
          apis: ["./src/controllers/*.ts"],
        };
    
        const specs = swaggerJsdoc(options);
        this._app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));
      }
}
