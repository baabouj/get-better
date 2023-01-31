import httpStatus from "http-status";

export class ApiException extends Error {
  constructor(public statusCode: number, public response?: any) {
    if (!response) {
      response = httpStatus[statusCode];
    }

    super(response as string);
    Object.setPrototypeOf(this, ApiException.prototype);
  }

  public getResponse() {
    return typeof this.response === "string"
      ? {
          statusCode: this.statusCode,
          message: this.response,
        }
      : this.response;
  }
}
