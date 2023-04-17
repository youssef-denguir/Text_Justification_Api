import { StatusCode } from "./status-code.enum";

export class ErrorResponse extends Error {
	public statusCode: StatusCode;

	constructor(
		public message: string,
		statusCode: number,
	) {
		super(message);
		this.statusCode = statusCode;
	}

	static badRequest(message?: string): ErrorResponse {
		return new this(message ?? "Bad request", StatusCode.BAD_REQUEST);
	}

	static unauthorized(message?: string): ErrorResponse {
		return new this(
			message ?? "You're not authenticated!",
			StatusCode.UNAUTHORIZED,
		);
	}

	static forbidden(message?: string): ErrorResponse {
		return new this(
			message ?? "You don't have permission to access this resource",
			StatusCode.FORBIDDEN,
		);
	}

	static paymentRequired(message?: string): ErrorResponse {
		return new this(
			message ?? "Payment Required.",
			StatusCode.PAYMENT_REQUIRED,
		);
	}

	static internalServerError(message?: string): ErrorResponse {
		return new this(
			message ?? "Internal Server Error",
			StatusCode.INTERNAL_SERVER_ERROR,
		);
	}
}
