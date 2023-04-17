import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../core/error-response";
import { SECRET_KEY } from "../config";
import { User } from "../models/interfaces/user.interface";
import { UserModel } from "../models/user.model";
import { StatusCode } from "../core/status-code.enum";


export async function authenticate(req: Request & { token: string },  res: Response, next: NextFunction): Promise<void> {
  try {
    const authHeader = req.headers?.authorization;
    if (!authHeader) {
      throw ErrorResponse.unauthorized();
    }
    const [,token] = authHeader?.split(" ");

    if (!token) {
      throw ErrorResponse.unauthorized();
    }
    const decoded = verify(token, SECRET_KEY) as {email: string, dayInMonth: number};
    if (!decoded || decoded.dayInMonth != new Date().getDate()) {
      throw ErrorResponse.unauthorized();
    }

    const user: User = await UserModel.findOne({ email: decoded.email });
    if (!user) {
      throw ErrorResponse.unauthorized();
    }

    req.token = token;
    next();
  }
  catch(error) {
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