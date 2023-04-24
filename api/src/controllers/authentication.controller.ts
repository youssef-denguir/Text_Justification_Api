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
/**
 * @swagger
 * auth/token:
 *   post:
 *     summary: Get an access token for a user.
 *     description: Returns an access token for a user's email address.
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               example: john@example.com
 *         description: The email address of the user for whom to generate an access token.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: The access token was generated successfully.
 *         schema:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *               example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20iLCJpYXQiOjE2MzY4MjA4MDgsImV4cCI6MTYzNjg2NzYwOH0.l1QL9hokYjvPllWqy8KjBkV7jKrJZfzVqwdCkh6Uu9o
 *       400:
 *         description: The request was missing the email parameter.
 *       500:
 *         description: An error occurred while generating the access token.
 */

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
