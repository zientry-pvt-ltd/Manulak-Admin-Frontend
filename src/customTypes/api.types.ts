export interface CommonResponseDTO<T> {
  data: T;
  statusCode: number;
  message: string;
  success: boolean;
}
