interface BaseResponse {
  success: boolean;
  message: string;
  status?: number;
}

interface Paging {
  pageNo: number;
  pageSize: number;
  length: number;
}

interface ListResponseDTO<T> extends BaseResponse {
  data: {
    entities: T[];
    paging: Paging;
  };
}

export type ApiResource<T> = ResponseDTO<T>;

export type ApiResourceList<T> = ListResponseDTO<T>;

export interface ResourceListQueryParams {
  filters: {
    query?: string;
  };
  paging: {
    pageNo: number;
    pageSize: number;
  };
  sorting: {
    columnName: string;
    sortOrder: 1 | -1; // 1 : ascending, -1 : descending
  };
}

export type NormalizedAPIError = {
  status: number | string;
  message: string;
  details?: unknown;
};

export interface ResponseDTO<T> extends BaseResponse {
  data: T;
}
