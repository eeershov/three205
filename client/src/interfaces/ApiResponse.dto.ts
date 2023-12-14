export interface ApiResponse<T> {
  success: boolean;
  code: number;
  error: boolean;
  message: string;
  data: T
}
