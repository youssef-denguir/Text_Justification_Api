import { Response, Request, Router } from "express";
import { ErrorResponse } from "../core/error-response";
import { StatusCode } from "../core/status-code.enum";
import { AuthService } from "../services/auth.service";

export class AuthenticationController {
    private readonly _router = Router();
    private readonly _authService = new AuthService();
    constructor() {
        this._router.post("/token", this.getToken.bind(this));
    }

    getRouter(): Router {
        return this._router;
    }

    private async getToken(req: Request, res: Response): Promise<void> {
        try {   
            const email = req.body?.email;
            if (!email) {
                throw ErrorResponse.badRequest("Email is required");
            }

            const token = await this._authService.getToken(email);
            res.status(StatusCode.SUCCESS).json({ token: token });
        }
        catch (error) {
            res.status(StatusCode.INTERNAL_SERVER_ERROR).send();
        }
    }
}
