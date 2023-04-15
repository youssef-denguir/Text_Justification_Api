import errorHandler from "errorhandler";
import app from "./app";


/**
 * Error Handler. Provides full stack
 */
if (process.env.NODE_ENV === "development") {
    app.use(errorHandler());
}


/**
 * Launch Express server.
 */
const server = app.listen(app.get("port") || 3000, () => {
    console.log(
        "  App is running at http://localhost:%d in %s mode",
        app.get("port"),
        app.get("env")
    );
});

export default server;
