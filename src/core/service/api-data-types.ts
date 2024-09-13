export interface FetchResponse<T> {
  results: T;
  message: string;
}

export interface FetchArrayResponse<T> {
  results: T[];
  message: string;
}
