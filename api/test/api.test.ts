import request from "supertest";
import { App } from "../../app";

describe("GET /api", () => {
    it("should return 200 OK", () => {
        return request(new App().init()).get("/api")
            .expect(200);
    });
});
