export interface BaseResponse {
  success: boolean;
  message: string;
  status?: number;
}

interface Paging {
  pageNo: number;
  pageSize: number;
  length: number;
}

interface ResponseDTO<T> extends BaseResponse {
  data: T;
}

interface ListResponseDTO<T> extends BaseResponse {
  entities: T[];
  paging: Paging;
}

export type ApiResource<T> = ResponseDTO<T>;

export type ApiResourceList<T> = ListResponseDTO<T>;

export type NormalizedAPIError = {
  status: number | string;
  message: string;
  details?: unknown;
};
