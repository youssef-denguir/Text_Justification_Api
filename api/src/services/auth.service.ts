import { sign } from "jsonwebtoken";
import { SECRET_KEY } from "../config";
import { ErrorResponse } from "../core/error-response";
import { User } from "../models/interfaces/user.interface";
import { UserModel } from "../models/user.model";

export class AuthService {
  public async getToken(email: string): Promise<string> {
      const user: User = await UserModel.findOne({ email: email });

      if (!user) {
        throw ErrorResponse.unauthorized();
      }

      return this.generateToken({email: user.email, dayInMonth: new Date().getDate() }, SECRET_KEY);
  }

  private generateToken(payload: {email: string, dayInMonth: number}, secretKey: string): string {
    return sign(JSON.stringify(payload), secretKey);
  }
}