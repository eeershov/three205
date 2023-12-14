export class ApiResponse<T> {
  success: boolean;
  code: number;
  error: boolean;
  message: string;
  data: T;

  constructor({success, code, error, message, data}: {success: boolean, code: number, error: boolean, message: string, data: T}) {
    this.success = success;
    this.code = code;
    this.error = error;
    this.message = message;
    this.data = data;
  }
}
