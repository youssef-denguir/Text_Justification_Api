import express, { Response, Request, Router } from "express";
import { ErrorResponse } from "../core/error-response";
import { StatusCode } from "../core/status-code.enum";
import { authenticate } from "../middleware/authenticate";
import { TextJustificationService } from "../services/text-justification.service";
import { WordsCountStore } from "../store/words-count-store";

export class TextJustificationController {
    private static thresholdPerDay = 80000;
    private readonly _router = Router();
    private readonly _store: WordsCountStore = WordsCountStore.getInstance();
    private readonly _justificationService = new TextJustificationService();

    constructor() {
        this._router.post("/justify", authenticate, express.text(), this.justifyText.bind(this));
    }

    getRouter(): Router {
        return this._router;
    }
/**
 * @swagger
 * /justify:
 *   post:
 *     summary: Justify a plain text
 *     description: This endpoint justifies a plain text
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - text/plain
 *     produces:
 *       - text/plain
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: JWT authorization header
 *         required: true
 *         type: string
 *         example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *       - in: body
 *         name: body
 *         description: Plain text to justify
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           type: string
 *         example: |
 *           This is an example of justified text
 *       402:
 *         $ref: '#/definitions/PaymentRequiredError'
 *       400:
 *         $ref: '#/definitions/BadRequestError'
 *       500:
 *         $ref: '#/definitions/InternalServerError'
 */
    private justifyText(req: Request & { token: string }, res: Response): void {
        try {  
            const { token }  = req;
            const inputText = req.body as string;
            const currentLineWordsCount = +(inputText)?.length;
            if (!currentLineWordsCount) {
                throw ErrorResponse.badRequest();
            }
            const oldWordsCount = this._store.get(token) ?? 0;
            if (oldWordsCount + currentLineWordsCount > TextJustificationController.thresholdPerDay) {
                throw ErrorResponse.paymentRequired();
            }

            const justifiedText = this._justificationService.justifyText(inputText);        
            this._store.set(token, currentLineWordsCount + oldWordsCount);
            res.status(StatusCode.SUCCESS).json({result: justifiedText });
        }
        catch (error) {
            if (error instanceof ErrorResponse) {
                res
                .status(error.statusCode)
                .json({ error: error.message });
            }
            else {
                res.status(StatusCode.INTERNAL_SERVER_ERROR).send();
            }
        }
    }
}
