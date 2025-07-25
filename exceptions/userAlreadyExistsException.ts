export class UserAlreadyExistsException extends Error {
  public readonly statusCode: number;
  public readonly code: string;

  constructor(email: string) {
    super(`User with email '${email}' already exists`);
    this.name = "UserAlreadyExistsException";
    this.statusCode = 409; // Conflict
    this.code = "USER_ALREADY_EXISTS";

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UserAlreadyExistsException);
    }
  }
}
