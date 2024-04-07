export class ErrorHandler extends Error {
  public status: number;
  public success: boolean;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.success = false;
  }
}
