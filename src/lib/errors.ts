export interface ICustomError extends Error {
  message: string;
  name: string;
  code: number;
}

export class CustomError implements ICustomError {
  name: string;
  message: string;
  code: number;

  constructor(message, code) {
    this.message = message || "Server error";
    this.code = code || 500;
    this.name = this.constructor.name;
  }
}
