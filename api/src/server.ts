import { App } from "./app";
import { NODE_ENV, PORT } from "./config";
import { dbConnection } from "./db";
import { connect } from "mongoose";

async function main(): Promise<void> {
    const app = new App().init();
    await connect(dbConnection.url, dbConnection.options);
    app.listen(PORT, () => {
        console.log(
            "App is running at http://localhost:%d in %s mode",
            PORT,
            NODE_ENV
        );
    });
}
    
main();