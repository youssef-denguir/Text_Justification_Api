import { App } from "./app";

const app = new App().init();

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
