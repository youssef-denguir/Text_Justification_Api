import { Response, Request, Router } from "express";

export class AuthController {
    private readonly _router = Router();
    constructor() {
        this._router.post("/login", this.login);
    }

    getRouter(): Router {
        return this._router;
    }

    private login(_req: Request, res: Response): void {
        res.status(200).json({ title: "test" });
    }
}
